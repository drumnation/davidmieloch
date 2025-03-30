const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { exec } = require('child_process');
const { PDFDocument } = require('pdf-lib');

// Configuration
const PDF_DIR = path.resolve(__dirname, '../public/media/saturn');
const THUMBNAIL_DIR = path.resolve(__dirname, '../public/media/saturn/thumbnails');
const PDF_FILES = [
  'sas-optimization-legalresearchfirm-3-12-2015.pdf',
  'saturn-information-value-management.pdf',
  'Saturn-Business-Systems-SME-Network.pdf'
];

// Create thumbnail directory if it doesn't exist
if (!fs.existsSync(THUMBNAIL_DIR)) {
  fs.mkdirSync(THUMBNAIL_DIR, { recursive: true });
  console.log(`Created thumbnail directory: ${THUMBNAIL_DIR}`);
}

// Extract first page of PDF and convert to image
async function extractFirstPageAsImage(pdfPath, outputPath, title) {
  try {
    // Create a temp directory for processing
    const tempDir = path.join(THUMBNAIL_DIR, 'temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    
    // Path for the temporary first page PDF
    const tempFirstPagePath = path.join(tempDir, `${path.basename(pdfPath, '.pdf')}-first-page.pdf`);
    
    // Load the PDF document
    const pdfBytes = fs.readFileSync(pdfPath);
    const srcDoc = await PDFDocument.load(pdfBytes);
    
    // Check if the document has pages
    if (srcDoc.getPageCount() === 0) {
      console.error(`PDF has no pages: ${pdfPath}`);
      return false;
    }
    
    // Create a new PDF with just the first page
    const newDoc = await PDFDocument.create();
    const [firstPage] = await newDoc.copyPages(srcDoc, [0]);
    newDoc.addPage(firstPage);
    
    // Save the first page PDF
    const newPdfBytes = await newDoc.save();
    fs.writeFileSync(tempFirstPagePath, newPdfBytes);
    
    console.log(`Extracted first page for ${title}`);
    
    // Use pdftoppm to convert PDF to image (much more reliable than other methods)
    const imageOutputBase = path.join(tempDir, path.basename(pdfPath, '.pdf'));
    
    return new Promise((resolve, reject) => {
      exec(`pdftoppm -png -singlefile "${tempFirstPagePath}" "${imageOutputBase}"`, async (error, stdout, stderr) => {
        if (error) {
          console.error(`Error converting PDF to image: ${error.message}`);
          console.log('Falling back to template thumbnail...');
          await generateTemplateThumbnail(outputPath, title);
          resolve(false);
          return;
        }
        
        // Get the generated image file
        const pngFilePath = `${imageOutputBase}.png`;
        
        if (fs.existsSync(pngFilePath)) {
          // Process the image with sharp to add a title bar and logo
          await enhanceExtractedPage(pngFilePath, outputPath, title);
          
          // Clean up temp files
          try {
            fs.unlinkSync(tempFirstPagePath);
            fs.unlinkSync(pngFilePath);
          } catch (err) {
            console.warn('Warning: Could not clean up some temporary files');
          }
          
          console.log(`Created thumbnail from first page for ${title}: ${outputPath}`);
          resolve(true);
        } else {
          console.error(`PNG output not found at ${pngFilePath}`);
          await generateTemplateThumbnail(outputPath, title);
          resolve(false);
        }
      });
    });
  } catch (err) {
    console.error(`Error extracting first page: ${err.message}`);
    // Fall back to template thumbnail
    await generateTemplateThumbnail(outputPath, title);
    return false;
  }
}

// Enhance the extracted page with title and branding
async function enhanceExtractedPage(sourcePngPath, outputPath, title) {
  try {
    // Get image dimensions
    const metadata = await sharp(sourcePngPath).metadata();
    const { width, height } = metadata;
    
    // Create an enhanced image with title bar
    const titleBar = Buffer.from(`
      <svg width="${width}" height="60" xmlns="http://www.w3.org/2000/svg">
        <rect width="${width}" height="60" fill="#f2f2f2"/>
        <text x="${width/2}" y="35" font-family="Arial" font-size="16" font-weight="bold" text-anchor="middle" fill="#333">
          ${title.length > 35 ? title.substring(0, 32) + '...' : title}
        </text>
      </svg>
    `);
    
    // Create a footer with branding
    const footer = Buffer.from(`
      <svg width="${width}" height="30" xmlns="http://www.w3.org/2000/svg">
        <rect width="${width}" height="30" fill="#f8f8f8"/>
        <text x="${width/2}" y="20" font-family="Arial" font-size="12" text-anchor="middle" fill="#888">
          Saturn Business Systems
        </text>
      </svg>
    `);
    
    // Combine titlebar, page image and footer
    await sharp({
      create: {
        width: width,
        height: height + 90, // Add space for title and footer
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      }
    })
      .composite([
        { input: titleBar, top: 0, left: 0 },
        { input: sourcePngPath, top: 60, left: 0 },
        { input: footer, top: height + 60, left: 0 }
      ])
      .toFile(outputPath);
    
    return true;
  } catch (err) {
    console.error(`Error enhancing extracted page: ${err.message}`);
    return false;
  }
}

// Generate a template thumbnail as fallback
async function generateTemplateThumbnail(outputPath, title) {
  try {
    // Create a 400x550 rectangle with light color background
    const width = 400;
    const height = 550;
    
    // Create a styled template with title and PDF icon
    const svgImage = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <!-- Background -->
        <rect width="100%" height="100%" fill="#f8f8f8"/>
        <rect x="5" y="5" width="${width-10}" height="${height-10}" fill="#fff" stroke="#ddd" stroke-width="1"/>
        
        <!-- PDF File Icon -->
        <g transform="translate(${width/2 - 35}, 60)">
          <!-- Document base -->
          <path d="M0,0 L50,0 L70,20 L70,90 L0,90 Z" fill="#e9e9e9" stroke="#bbb" stroke-width="1"/>
          <!-- Folded corner -->
          <path d="M50,0 L50,20 L70,20 Z" fill="#d9d9d9" stroke="#bbb" stroke-width="1"/>
          <!-- PDF text -->
          <rect x="15" y="40" width="40" height="28" rx="3" fill="#e74c3c"/>
          <text x="35" y="59" font-family="Arial" font-size="16" font-weight="bold" text-anchor="middle" fill="white">PDF</text>
        </g>
        
        <!-- Title Bar -->
        <rect x="5" y="165" width="${width-10}" height="40" fill="#f2f2f2"/>
        <text x="${width/2}" y="190" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle" fill="#333">
          ${title.length > 35 ? title.substring(0, 32) + '...' : title}
        </text>
        
        <!-- Document Preview Area -->
        <rect x="20" y="220" width="${width-40}" height="240" fill="#fff" stroke="#ddd"/>
        
        <!-- Document Content Lines Simulation -->
        <rect x="40" y="240" width="${width-80}" height="10" fill="#eee" rx="2"/>
        <rect x="40" y="260" width="${width-80}" height="10" fill="#eee" rx="2"/>
        <rect x="40" y="280" width="${width-120}" height="10" fill="#eee" rx="2"/>
        <rect x="40" y="310" width="${width-80}" height="10" fill="#eee" rx="2"/>
        <rect x="40" y="330" width="${width-80}" height="10" fill="#eee" rx="2"/>
        <rect x="40" y="350" width="${width-110}" height="10" fill="#eee" rx="2"/>
        <rect x="40" y="380" width="${width-80}" height="10" fill="#eee" rx="2"/>
        <rect x="40" y="400" width="${width-150}" height="10" fill="#eee" rx="2"/>
        <rect x="40" y="420" width="${width-80}" height="10" fill="#eee" rx="2"/>
        
        <!-- Footer -->
        <text x="${width/2}" y="${height-15}" font-family="Arial" font-size="11" text-anchor="middle" fill="#888">Saturn Business Systems</text>
      </svg>
    `;

    // Convert SVG to PNG
    await sharp(Buffer.from(svgImage))
      .toFile(outputPath);
      
    console.log(`Created template thumbnail for ${title}: ${outputPath}`);
    return true;
  } catch (err) {
    console.error(`Error generating template thumbnail for ${title}:`, err);
    return false;
  }
}

// Process each PDF file
async function processPDFs() {
  try {
    const titles = {
      'sas-optimization-legalresearchfirm-3-12-2015': 'SAS Optimization Case Study',
      'saturn-information-value-management': 'Information Value Management',
      'Saturn-Business-Systems-SME-Network': 'SME Network Overview'
    };
    
    for (const pdfFile of PDF_FILES) {
      // Set up paths
      const pdfPath = path.join(PDF_DIR, pdfFile);
      const baseName = path.basename(pdfFile, '.pdf');
      const thumbnailPath = path.join(THUMBNAIL_DIR, `${baseName}-thumbnail.png`);
      const title = titles[baseName] || baseName.replace(/-/g, ' ');
      
      if (fs.existsSync(pdfPath)) {
        console.log(`Processing PDF: ${pdfFile}`);
        
        try {
          // Try to extract the first page as an image
          const success = await extractFirstPageAsImage(pdfPath, thumbnailPath, title);
          
          if (!success) {
            console.log(`Using template thumbnail for ${title} as fallback`);
          }
        } catch (error) {
          console.error(`Error processing ${pdfFile}: ${error.message}`);
          await generateTemplateThumbnail(thumbnailPath, title);
        }
      } else {
        console.log(`PDF file not found: ${pdfPath}`);
        await generateTemplateThumbnail(thumbnailPath, title);
      }
    }
    
    console.log('All thumbnails generated successfully');
    
    // Clean up temp directory
    const tempDir = path.join(THUMBNAIL_DIR, 'temp');
    if (fs.existsSync(tempDir)) {
      try {
        fs.rmSync(tempDir, { recursive: true, force: true });
      } catch (err) {
        console.warn(`Warning: Could not remove temp directory: ${err.message}`);
      }
    }
  } catch (err) {
    console.error('Error processing PDFs:', err);
  }
}

// Run the script
processPDFs(); 