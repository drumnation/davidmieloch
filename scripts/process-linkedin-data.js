#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const axios = require('axios');
const { createObjectCsvWriter } = require('csv-writer');
const puppeteer = require('puppeteer');
const crypto = require('crypto');
const readline = require('readline');

// Configuration
const CONFIG = {
  linkedinCookiesPath: path.join(__dirname, '../.brain/linkedin-cookies.json'),
  clearbitApiKey: '', // Clearbit Logo API is deprecated and no longer available
  useClearbit: false, // Set to false since Clearbit Logo API is deprecated
  useAuthentication: false, // Set to true if using LinkedIn cookies
  downloadRetries: 3,
  verbose: true, // Set to true for detailed logging
  generateLetterAvatars: true, // Always generate letter avatars as fallback
  colorPalette: [
    '#0077B5', // LinkedIn blue
    '#313335', // LinkedIn dark gray
    '#86888A', // LinkedIn light gray
    '#2867B2', // LinkedIn brand blue
    '#00A0DC', // LinkedIn messaging blue
    '#F5F5F5', // LinkedIn light background
    '#E7A33E', // LinkedIn premium gold
    '#009E52', // LinkedIn success green
    '#D44638', // Error/alert red
    '#665ED0'  // Purple
  ]
};

// Paths
const EXPORT_DIR = path.join(process.cwd(), '.brain/linkedInDataExport');
const OUTPUT_DIR = path.join(process.cwd(), 'public');
const JSON_OUTPUT_DIR = path.join(process.cwd(), 'src/data');
const PROFILE_DIR = path.join(OUTPUT_DIR, 'profile');
const COMPANY_LOGOS_DIR = path.join(OUTPUT_DIR, 'company-logos');
const SCHOOL_LOGOS_DIR = path.join(OUTPUT_DIR, 'school-logos');
const MEDIA_DIR = path.join(OUTPUT_DIR, 'linkedin-media');

// Ensure directories exist
[PROFILE_DIR, COMPANY_LOGOS_DIR, SCHOOL_LOGOS_DIR, MEDIA_DIR, JSON_OUTPUT_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Enhanced logging function
function log(message, level = 'info') {
  const timestamp = new Date().toISOString();
  const prefix = {
    info: '📘 INFO',
    warn: '⚠️ WARNING',
    error: '❌ ERROR',
    success: '✅ SUCCESS',
    debug: '🔍 DEBUG'
  }[level] || '📘 INFO';
  
  // Only log debug messages if verbose is true
  if (level === 'debug' && !CONFIG.verbose) return;
  
  console.log(`[${timestamp}] ${prefix}: ${message}`);
}

// Ask for LinkedIn authentication (if needed)
async function promptForAuthentication() {
  if (!CONFIG.useAuthentication) return false;
  
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    if (fs.existsSync(CONFIG.linkedinCookiesPath)) {
      rl.question('LinkedIn cookies file found. Use it for authentication? (y/n): ', (answer) => {
        rl.close();
        resolve(answer.toLowerCase() === 'y');
      });
    } else {
      log('To download media directly from LinkedIn, you need to provide your cookies.', 'warn');
      log('Instructions:', 'info');
      log('1. Log in to LinkedIn in your browser', 'info');
      log('2. Use browser developer tools to export cookies to JSON', 'info');
      log('3. Save the cookies JSON file to: ' + CONFIG.linkedinCookiesPath, 'info');
      
      rl.question('Do you want to continue without authentication? (y/n): ', (answer) => {
        rl.close();
        
        if (answer.toLowerCase() === 'y') {
          log('Continuing without LinkedIn authentication.', 'warn');
          resolve(false);
        } else {
          log('Please save your cookies file and restart the script.', 'info');
          resolve(null);
        }
      });
    }
  });
}

// Helper function to parse CSV files
async function parseCSV(filePath) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(filePath)) {
      log(`File not found: ${filePath}`, 'error');
      resolve([]);
      return;
    }
    
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        log(`Successfully parsed ${results.length} records from ${path.basename(filePath)}`, 'success');
        resolve(results);
      })
      .on('error', (error) => {
        log(`Error parsing CSV file ${filePath}: ${error.message}`, 'error');
        reject(error);
      });
  });
}

// Generate a simple CSS-based letter avatar as an HTML file instead of using canvas
function generateLetterAvatar(letter, outputPath) {
  try {
    // Generate a stable color based on the letter to ensure consistency
    const colorIndex = letter.charCodeAt(0) % CONFIG.colorPalette.length;
    const bgColor = CONFIG.colorPalette[colorIndex];
    
    // Create a simple HTML file with CSS styling
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body, html {
      margin: 0;
      padding: 0;
      width: 200px;
      height: 200px;
      overflow: hidden;
    }
    .avatar {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      background-color: ${bgColor};
      color: white;
      font-family: Arial, sans-serif;
      font-size: 100px;
      font-weight: bold;
      box-sizing: border-box;
      border: 8px solid rgba(255, 255, 255, 0.2);
    }
  </style>
</head>
<body>
  <div class="avatar">${letter.toUpperCase()}</div>
</body>
</html>`;
    
    // Write the HTML file
    fs.writeFileSync(outputPath, htmlContent);
    log(`Generated HTML letter avatar for '${letter}' at ${outputPath}`, 'success');
    
    // Create a screenshot of the HTML with Puppeteer if available
    generateLetterAvatarWithPuppeteer(letter, outputPath, bgColor).catch(() => {
      log(`Using HTML avatar as fallback for ${letter}`, 'info');
    });
    
    return true;
  } catch (error) {
    log(`Error generating letter avatar: ${error.message}`, 'error');
    
    // Create an empty file as a last resort fallback
    try {
      fs.writeFileSync(outputPath, '');
      return true;
    } catch (writeError) {
      log(`Error creating empty file: ${writeError.message}`, 'error');
      return false;
    }
  }
}

// Generate a PNG letter avatar using Puppeteer
async function generateLetterAvatarWithPuppeteer(letter, outputPath, bgColor) {
  try {
    // Create a temporary HTML file
    const tempDir = path.join(__dirname, '../.brain/temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    
    const tempHtmlPath = path.join(tempDir, `avatar_${letter}_${Date.now()}.html`);
    const pngOutputPath = outputPath.replace('.html', '.png');
    
    // Create a simple HTML file with CSS styling
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body, html {
      margin: 0;
      padding: 0;
      width: 200px;
      height: 200px;
      overflow: hidden;
    }
    .avatar {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      background-color: ${bgColor};
      color: white;
      font-family: Arial, sans-serif;
      font-size: 100px;
      font-weight: bold;
      box-sizing: border-box;
      border: 8px solid rgba(255, 255, 255, 0.2);
    }
  </style>
</head>
<body>
  <div class="avatar">${letter.toUpperCase()}</div>
</body>
</html>`;
    
    fs.writeFileSync(tempHtmlPath, htmlContent);
    
    // Launch Puppeteer to take a screenshot
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.setViewport({ width: 200, height: 200 });
    await page.goto(`file://${tempHtmlPath}`, { waitUntil: 'networkidle2' });
    
    // Take screenshot
    await page.screenshot({ path: pngOutputPath, omitBackground: false });
    
    await browser.close();
    
    // Clean up temp file
    fs.unlinkSync(tempHtmlPath);
    
    log(`Generated PNG letter avatar for '${letter}' at ${pngOutputPath}`, 'success');
    return true;
  } catch (error) {
    log(`Error generating PNG avatar with Puppeteer: ${error.message}`, 'error');
    return false;
  }
}

// Get LinkedIn cookies if available
function getLinkedInCookies() {
  if (!CONFIG.useAuthentication || !fs.existsSync(CONFIG.linkedinCookiesPath)) {
    return null;
  }
  
  try {
    const cookiesData = fs.readFileSync(CONFIG.linkedinCookiesPath, 'utf8');
    const cookies = JSON.parse(cookiesData);
    
    // Convert to axios cookie format if needed
    return cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ');
  } catch (error) {
    log(`Error loading LinkedIn cookies: ${error.message}`, 'error');
    return null;
  }
}

// Try to fetch company logo from Clearbit API (deprecated, kept for reference)
async function fetchCompanyLogoFromClearbit(companyName) {
  log('Clearbit Logo API is deprecated and no longer available.', 'warn');
  log('Using letter avatars as fallback.', 'info');
  return null;
  
  // Keeping the original code commented out for reference
  /*
  if (!CONFIG.clearbitApiKey || !CONFIG.useClearbit) {
    log('No Clearbit API key provided or service disabled. Skipping Clearbit logo search.', 'debug');
    return null;
  }
  
  try {
    log(`Searching for ${companyName} logo on Clearbit...`, 'debug');
    
    const encodedName = encodeURIComponent(companyName);
    const url = `https://logo.clearbit.com/${encodedName}.com`;
    
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      headers: {
        'Authorization': `Bearer ${CONFIG.clearbitApiKey}`
      }
    });
    
    log(`Successfully found logo for ${companyName} on Clearbit`, 'success');
    return response.data;
  } catch (error) {
    log(`Clearbit logo search failed for ${companyName}: ${error.message}`, 'debug');
    return null;
  }
  */
}

// Helper function to download file with enhanced error handling and multiple sources
async function downloadFile(url, outputPath, entityName = null, entityType = null, retry = CONFIG.downloadRetries) {
  // Skip if the file already exists
  if (fs.existsSync(outputPath)) {
    log(`File already exists at ${outputPath}, skipping download`, 'info');
    return true;
  }
  
  try {
    log(`Downloading from ${url} to ${outputPath}...`, 'info');
    
    // Method 1: Direct download with axios and optional LinkedIn cookies
    try {
      const cookies = getLinkedInCookies();
      const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Referer': 'https://www.linkedin.com/',
        ...(cookies ? { 'Cookie': cookies } : {})
      };
      
      log(`Attempting direct download with headers: ${JSON.stringify(headers)}`, 'debug');
      
      const response = await axios.get(url, {
        responseType: 'arraybuffer',
        headers,
        timeout: 10000 // 10 second timeout
      });
      
      fs.writeFileSync(outputPath, response.data);
      log(`Successfully downloaded ${url}`, 'success');
      return true;
    } catch (axiosError) {
      log(`Direct download failed for ${url}: ${axiosError.message}`, 'debug');
      
      // Method 2: If it's a company logo, try alternative sources (Clearbit deprecated)
      if (entityType === 'company' && entityName) {
        log(`Skipping Clearbit logo search for ${entityName} as the service is deprecated.`, 'info');
        // We'll proceed directly to generating letter avatars
      }
      
      // Method 3: If direct download fails and we have retries left, try with puppeteer
      if (retry > 0) {
        log(`Attempting download with puppeteer, retries left: ${retry}`, 'info');
        
        const browser = await puppeteer.launch({
          headless: 'new',
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-web-security',
            '--disable-features=IsolateOrigins,site-per-process'
          ]
        });
        
        const page = await browser.newPage();
        
        // Set a realistic user agent
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
        
        // Set viewport to a common desktop resolution
        await page.setViewport({
          width: 1920,
          height: 1080
        });
        
        // Use LinkedIn cookies if available
        if (CONFIG.useAuthentication && fs.existsSync(CONFIG.linkedinCookiesPath)) {
          const cookiesData = fs.readFileSync(CONFIG.linkedinCookiesPath, 'utf8');
          const cookies = JSON.parse(cookiesData);
          
          if (Array.isArray(cookies) && cookies.length > 0) {
            await page.setCookie(...cookies);
            log('Using LinkedIn cookies for authentication in Puppeteer', 'debug');
          }
        }
        
        try {
          // Navigate to the page
          await page.goto(url, { 
            waitUntil: 'networkidle2',
            timeout: 30000 // 30 second timeout
          });
          
          // Take a screenshot for debugging
          if (CONFIG.verbose) {
            const debugScreenshotPath = path.join(__dirname, `debug_${Date.now()}.png`);
            await page.screenshot({ path: debugScreenshotPath });
            log(`Saved debug screenshot to ${debugScreenshotPath}`, 'debug');
          }
          
          // Get image content
          const imgContent = await page.evaluate(async () => {
            const img = document.querySelector('img');
            if (!img) return null;
            
            // Try to get the image source
            let imgSrc = img.src;
            
            // If no src, check for data-src or other common attributes
            if (!imgSrc) {
              imgSrc = img.getAttribute('data-src') || 
                      img.getAttribute('data-lazy-src') || 
                      img.getAttribute('data-original');
            }
            
            if (!imgSrc) return null;
            
            try {
              const response = await fetch(imgSrc);
              const buffer = await response.arrayBuffer();
              return Array.from(new Uint8Array(buffer));
            } catch (error) {
              console.error('Error fetching image:', error);
              return null;
            }
          });
          
          if (imgContent) {
            const buffer = Buffer.from(imgContent);
            fs.writeFileSync(outputPath, buffer);
            log(`Successfully downloaded with puppeteer: ${url}`, 'success');
            await browser.close();
            return true;
          }
          
          log('No image found on the page', 'debug');
          await browser.close();
          
          // Try again with lower retry count
          return downloadFile(url, outputPath, entityName, entityType, retry - 1);
        } catch (puppeteerError) {
          await browser.close();
          log(`Puppeteer download failed for ${url}: ${puppeteerError.message}`, 'debug');
          return downloadFile(url, outputPath, entityName, entityType, retry - 1);
        }
      }
      
      // Method 4: If all else fails and we have an entity name, generate a letter avatar
      if (CONFIG.generateLetterAvatars && entityName) {
        log(`All download attempts failed. Generating letter avatar for ${entityName}`, 'warn');
        const firstLetter = entityName.charAt(0);
        
        if (generateLetterAvatar(firstLetter, outputPath)) {
          return true;
        }
      }
      
      log(`All download attempts failed for ${url}`, 'error');
      return false;
    }
  } catch (error) {
    log(`Error downloading ${url}: ${error.message}`, 'error');
    if (retry > 0) {
      log(`Retrying... (${retry} attempts left)`, 'info');
      return downloadFile(url, outputPath, entityName, entityType, retry - 1);
    }
    
    // Method 4: If all else fails and we have an entity name, generate a letter avatar
    if (CONFIG.generateLetterAvatars && entityName) {
      log(`All download attempts failed. Generating letter avatar for ${entityName}`, 'warn');
      const firstLetter = entityName.charAt(0);
      
      if (generateLetterAvatar(firstLetter, outputPath)) {
        return true;
      }
    }
    
    return false;
  }
}

// Process Profile data
async function processProfile() {
  try {
    log('Processing profile data...', 'info');
    const profiles = await parseCSV(path.join(EXPORT_DIR, 'Profile.csv'));
    
    if (profiles.length === 0) {
      log('No profile data found', 'error');
      return null;
    }
    
    const profile = profiles[0];
    
    // Download profile photo if available in Rich_Media.csv
    const mediaItems = await parseCSV(path.join(EXPORT_DIR, 'Rich_Media.csv'));
    const profilePhotos = mediaItems.filter(item => 
      item['Media Description']?.includes('profile photo') || 
      item['Media Description']?.includes('profile picture')
    );
    
    let photoUrl = null;
    let profilePhotoPath = '/web-app-manifest-192x192.png'; // Default
    
    if (profilePhotos.length > 0) {
      // Sort by date to get the most recent profile photo
      profilePhotos.sort((a, b) => {
        const dateA = new Date(a['Date/Time'] || 0);
        const dateB = new Date(b['Date/Time'] || 0);
        return dateB - dateA;
      });
      
      const mostRecentPhoto = profilePhotos[0];
      photoUrl = mostRecentPhoto['Media Link'];
      
      // Download profile photo
      if (photoUrl) {
        const photoExt = photoUrl.split('.').pop()?.split('?')[0] || 'jpg';
        const photoPath = path.join(PROFILE_DIR, `profile-photo.${photoExt}`);
        const fullName = `${profile['First Name']} ${profile['Last Name']}`;
        
        if (await downloadFile(photoUrl, photoPath, fullName, 'profile')) {
          profilePhotoPath = `/profile/profile-photo.${photoExt}`;
          log('Profile photo downloaded successfully', 'success');
        } else {
          log('Using default profile image', 'warn');
        }
      }
    } else {
      log('No profile photo found in Rich_Media.csv', 'warn');
    }
    
    // Create profile data object
    const profileData = {
      firstName: profile['First Name'] || '',
      lastName: profile['Last Name'] || '',
      fullName: `${profile['First Name'] || ''} ${profile['Last Name'] || ''}`.trim(),
      headline: profile['Headline'] || '',
      summary: profile['Summary'] || '',
      location: profile['Geo Location'] || '',
      industry: profile['Industry'] || '',
      photoPath: profilePhotoPath
    };
    
    // Save profile data
    fs.writeFileSync(
      path.join(JSON_OUTPUT_DIR, 'profile.json'),
      JSON.stringify(profileData, null, 2)
    );
    
    log('Profile data processed successfully', 'success');
    return profileData;
  } catch (error) {
    log(`Error processing profile data: ${error.message}`, 'error');
    return null;
  }
}

// Process Positions (work experience)
async function processPositions() {
  try {
    log('Processing positions data...', 'info');
    const positions = await parseCSV(path.join(EXPORT_DIR, 'Positions.csv'));
    
    if (positions.length === 0) {
      log('No positions data found', 'warn');
      return [];
    }
    
    // Process each position
    const processedPositions = [];
    
    for (const position of positions) {
      // Extract bullet points from description
      const description = position.Description || '';
      let bulletPoints = [];
      
      // Simple regex to extract bullet points (assumes they start with •, -, or *)
      const bulletRegex = /(?:^|\n)\s*[•\-\*]\s*(.+?)(?=(?:\n\s*[•\-\*])|$)/g;
      let match;
      
      while ((match = bulletRegex.exec(description)) !== null) {
        bulletPoints.push(match[1].trim());
      }
      
      // If no bullet points were found, leave description as is
      const cleanDescription = bulletPoints.length > 0 
        ? description.replace(bulletRegex, '').trim()
        : description;
      
      // Generate filename for company logo
      const companyName = position['Company Name'] || '';
      const companyFileName = companyName.toLowerCase().replace(/[^a-z0-9]/g, '') + '.png';
      const companyHtmlPath = path.join(COMPANY_LOGOS_DIR, companyName.toLowerCase().replace(/[^a-z0-9]/g, '') + '.html');
      const companyPngPath = path.join(COMPANY_LOGOS_DIR, companyFileName);
      
      // Try to find company logo
      // For LinkedIn, we don't have direct company logo URLs
      // Try to generate a letter avatar
      if (!fs.existsSync(companyPngPath) && CONFIG.generateLetterAvatars) {
        // Generate letter avatar as HTML
        generateLetterAvatar(companyName.charAt(0), companyHtmlPath);
      }
      
      processedPositions.push({
        company: companyName,
        title: position.Title || '',
        location: position.Location || '',
        startDate: position['Started On'] || '',
        endDate: position['Finished On'] || 'Present',
        description: cleanDescription,
        bulletPoints: bulletPoints.length > 0 ? bulletPoints : [],
        logoPath: `/company-logos/${companyFileName}`
      });
    }
    
    // Sort positions by date (most recent first)
    processedPositions.sort((a, b) => {
      const dateA = new Date(a.startDate || 0);
      const dateB = new Date(b.startDate || 0);
      return dateB - dateA;
    });
    
    // Save positions data
    fs.writeFileSync(
      path.join(JSON_OUTPUT_DIR, 'positions.json'),
      JSON.stringify(processedPositions, null, 2)
    );
    
    log(`Processed ${processedPositions.length} positions successfully`, 'success');
    return processedPositions;
  } catch (error) {
    log(`Error processing positions data: ${error.message}`, 'error');
    return [];
  }
}

// Process Education
async function processEducation() {
  try {
    log('Processing education data...', 'info');
    const education = await parseCSV(path.join(EXPORT_DIR, 'Education.csv'));
    
    if (education.length === 0) {
      log('No education data found', 'warn');
      return [];
    }
    
    // Process each education entry
    const processedEducation = [];
    
    for (const edu of education) {
      const schoolName = edu['School Name'] || '';
      const schoolFileName = schoolName.toLowerCase().replace(/[^a-z0-9]/g, '') + '.png';
      const schoolHtmlPath = path.join(SCHOOL_LOGOS_DIR, schoolName.toLowerCase().replace(/[^a-z0-9]/g, '') + '.html');
      const schoolPngPath = path.join(SCHOOL_LOGOS_DIR, schoolFileName);
      
      // Try to find school logo
      // For LinkedIn, we don't have direct school logo URLs
      // Generate a letter avatar
      if (!fs.existsSync(schoolPngPath) && CONFIG.generateLetterAvatars) {
        // Generate letter avatar
        generateLetterAvatar(schoolName.charAt(0), schoolHtmlPath);
      }
      
      processedEducation.push({
        school: schoolName,
        degree: edu['Degree Name'] || '',
        fieldOfStudy: edu['Notes'] ? edu['Notes'].split('•')[0].trim() : '',
        startDate: edu['Start Date'] || '',
        endDate: edu['End Date'] || '',
        description: edu['Notes'] || '',
        activities: edu['Activities'] || '',
        logoPath: `/school-logos/${schoolFileName}`
      });
    }
    
    // Sort education by date (most recent first)
    processedEducation.sort((a, b) => {
      const dateA = new Date(a.startDate || 0);
      const dateB = new Date(b.startDate || 0);
      return dateB - dateA;
    });
    
    // Save education data
    fs.writeFileSync(
      path.join(JSON_OUTPUT_DIR, 'education.json'),
      JSON.stringify(processedEducation, null, 2)
    );
    
    log(`Processed ${processedEducation.length} education entries successfully`, 'success');
    return processedEducation;
  } catch (error) {
    log(`Error processing education data: ${error.message}`, 'error');
    return [];
  }
}

// Process Skills
async function processSkills() {
  try {
    log('Processing skills data...', 'info');
    const skills = await parseCSV(path.join(EXPORT_DIR, 'Skills.csv'));
    
    if (skills.length === 0) {
      log('No skills data found', 'warn');
      return [];
    }
    
    // Extract skill names
    const skillNames = skills.map(skill => skill.Name || '').filter(name => name.trim() !== '');
    
    // Save skills data
    fs.writeFileSync(
      path.join(JSON_OUTPUT_DIR, 'skills.json'),
      JSON.stringify(skillNames, null, 2)
    );
    
    log(`Processed ${skillNames.length} skills successfully`, 'success');
    return skillNames;
  } catch (error) {
    log(`Error processing skills data: ${error.message}`, 'error');
    return [];
  }
}

// Download media files from Rich_Media.csv
async function downloadMediaFiles() {
  try {
    log('Downloading media files...', 'info');
    const mediaItems = await parseCSV(path.join(EXPORT_DIR, 'Rich_Media.csv'));
    
    if (mediaItems.length === 0) {
      log('No media items found', 'warn');
      return false;
    }
    
    // Create a directory for each media type
    const mediaTypes = ['photo', 'document', 'video'];
    mediaTypes.forEach(type => {
      const dir = path.join(MEDIA_DIR, type);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
    
    // Download each media file
    let successCount = 0;
    let failCount = 0;
    
    for (const [index, item] of mediaItems.entries()) {
      const url = item['Media Link'];
      if (!url) {
        log(`No URL found for media item ${index}`, 'warn');
        continue;
      }
      
      // Skip profile photos as they're handled in processProfile
      if (item['Media Description']?.includes('profile photo') || 
          item['Media Description']?.includes('profile picture')) {
        log(`Skipping profile photo: ${url}`, 'debug');
        continue;
      }
      
      // Determine media type from description or URL
      let mediaType = 'photo'; // Default
      if (item['Media Description']?.includes('document')) {
        mediaType = 'document';
      } else if (item['Media Description']?.includes('video')) {
        mediaType = 'video';
      } else if (url.includes('.pdf')) {
        mediaType = 'document';
      } else if (url.includes('.mp4') || url.includes('.avi') || url.includes('.mov')) {
        mediaType = 'video';
      }
      
      // Determine file extension
      let ext = 'jpg'; // Default
      const urlParts = url.split('.');
      if (urlParts.length > 1) {
        const possibleExt = urlParts[urlParts.length - 1].split('?')[0];
        if (possibleExt.length <= 4) {
          ext = possibleExt;
        }
      }
      
      // Generate a unique filename
      const timestamp = item['Date/Time'] ? new Date(item['Date/Time']).getTime() : Date.now();
      const fileName = `media_${index}_${timestamp}.${ext}`;
      const outputPath = path.join(MEDIA_DIR, mediaType, fileName);
      
      // Download the file
      if (await downloadFile(url, outputPath)) {
        successCount++;
      } else {
        failCount++;
      }
    }
    
    log(`Media download summary: ${successCount} successful, ${failCount} failed`, successCount > 0 ? 'success' : 'warn');
    return successCount > 0;
  } catch (error) {
    log(`Error downloading media files: ${error.message}`, 'error');
    return false;
  }
}

// Create placeholder LinkedIn data for testing
async function createPlaceholderData() {
  log('Creating placeholder LinkedIn data for testing...', 'info');

  // Ensure the export directory exists
  if (!fs.existsSync(EXPORT_DIR)) {
    fs.mkdirSync(EXPORT_DIR, { recursive: true });
  }

  // Create placeholder Profile.csv
  const profileData = 
`First Name,Last Name,Maiden Name,Address,Geo Location,Industry,Headline,Summary
David,Mieloch,,,"New York, NY",Software Development,Full-Stack Developer,"Experienced developer with a passion for creating elegant and efficient solutions to complex problems."`;

  fs.writeFileSync(path.join(EXPORT_DIR, 'Profile.csv'), profileData);
  log('Created placeholder Profile.csv', 'success');

  // Create placeholder Positions.csv
  const positionsData = 
`Company Name,Title,Description,Location,Started On,Finished On,Company URL
Synaptiq,Senior Developer,"Led development of AI-powered applications.
• Implemented machine learning models for computer vision
• Architected scalable backend systems
• Mentored junior developers","Portland, OR",Jan 2020,Present,https://www.synaptiq.ai
Scala,Software Engineer,"Developed enterprise software solutions.
• Built responsive web applications using React
• Created RESTful APIs with Node.js
• Improved test coverage by 40%","San Francisco, CA",Mar 2018,Dec 2019,https://www.scala.com
DrayNow,Junior Developer,"Focused on front-end development.
• Implemented UI components using Vue.js
• Optimized application performance
• Collaborated with design team","Philadelphia, PA",Jun 2016,Feb 2018,https://www.draynow.com`;

  fs.writeFileSync(path.join(EXPORT_DIR, 'Positions.csv'), positionsData);
  log('Created placeholder Positions.csv', 'success');

  // Create placeholder Education.csv
  const educationData = 
`School Name,Start Date,End Date,Degree Name,Activities,Notes
West Chester University,2012,2016,Bachelor of Science in Computer Science,Programming Club,Computer Science with focus on software engineering.
Flatiron School,2015,2016,Web Development Bootcamp,Hackathon Participant,Intensive program focusing on full-stack web development.`;

  fs.writeFileSync(path.join(EXPORT_DIR, 'Education.csv'), educationData);
  log('Created placeholder Education.csv', 'success');

  // Create placeholder Skills.csv
  const skillsData = 
`Name,URL
JavaScript,
TypeScript,
React,
Node.js,
Python,
SQL,
GraphQL,
AWS,
Docker,
Git,
CI/CD,
Agile,
TDD,
UI/UX Design,
Data Analysis,
Machine Learning,
Problem Solving,
Team Leadership,
Communication,
Project Management`;

  fs.writeFileSync(path.join(EXPORT_DIR, 'Skills.csv'), skillsData);
  log('Created placeholder Skills.csv', 'success');

  // Create placeholder Rich_Media.csv
  const richMediaData = 
`Media Link,Date/Time,Media Description
https://example.com/profile-photo.jpg,2023-01-01 12:00:00,profile photo
https://example.com/company-logo-synaptiq.jpg,2023-01-02 12:00:00,Synaptiq company logo
https://example.com/company-logo-scala.jpg,2023-01-02 12:00:00,Scala company logo
https://example.com/company-logo-draynow.jpg,2023-01-02 12:00:00,DrayNow company logo
https://example.com/school-logo-wcu.jpg,2023-01-03 12:00:00,West Chester University logo
https://example.com/school-logo-flatiron.jpg,2023-01-03 12:00:00,Flatiron School logo
https://example.com/certificate.pdf,2023-01-04 12:00:00,document certification
https://example.com/project-photo1.jpg,2023-01-05 12:00:00,photo of project 1
https://example.com/project-photo2.jpg,2023-01-05 12:00:00,photo of project 2`;

  fs.writeFileSync(path.join(EXPORT_DIR, 'Rich_Media.csv'), richMediaData);
  log('Created placeholder Rich_Media.csv', 'success');

  log('Placeholder LinkedIn data created successfully!', 'success');
  return true;
}

// Main function to run all processors
async function main() {
  log('Starting LinkedIn data processing...', 'info');
  
  // Check if LinkedIn data exists, if not create placeholder data
  const profilePath = path.join(EXPORT_DIR, 'Profile.csv');
  if (!fs.existsSync(profilePath)) {
    log('LinkedIn data not found. Creating placeholder data...', 'warn');
    await createPlaceholderData();
  }
  
  // Check for authentication if enabled
  if (CONFIG.useAuthentication) {
    const useAuth = await promptForAuthentication();
    
    if (useAuth === null) {
      log('Exiting script as requested.', 'info');
      process.exit(0);
    }
    
    CONFIG.useAuthentication = useAuth;
  }
  
  // Process all data
  const profile = await processProfile();
  const positions = await processPositions();
  const education = await processEducation();
  const skills = await processSkills();
  
  // Download media files
  await downloadMediaFiles();
  
  log('LinkedIn data processing completed!', 'success');
}

// Run the script
main().catch(error => {
  log(`Error in main process: ${error.message}`, 'error');
  process.exit(1);
}); 