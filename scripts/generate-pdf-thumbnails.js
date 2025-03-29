const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Configuration
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

// Generate simple colored rectangle thumbnails with text overlay
async function generateSimpleThumbnail(outputPath, title) {
  try {
    // Create a 500x700 rectangle with light color background
    const width = 400;
    const height = 550;
    
    // Create a solid color SVG with text
    const svgImage = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f5f5f5"/>
        <rect x="5" y="5" width="${width-10}" height="${height-10}" fill="#f5f5f5" stroke="#cccccc" stroke-width="2"/>
        <circle cx="${width/2}" cy="100" r="40" fill="#e74c3c"/>
        <text x="${width/2}" y="115" font-family="Arial" font-size="40" font-weight="bold" text-anchor="middle" fill="white">PDF</text>
        <text x="${width/2}" y="200" font-family="Arial" font-size="24" font-weight="bold" text-anchor="middle" fill="#333333">${title.length > 20 ? title.substring(0, 17) + '...' : title}</text>
        <text x="${width/2}" y="${height-30}" font-family="Arial" font-size="16" text-anchor="middle" fill="#555555">Saturn Business Systems</text>
      </svg>
    `;

    // Convert SVG to PNG
    await sharp(Buffer.from(svgImage))
      .toFile(outputPath);
      
    console.log(`Created thumbnail: ${outputPath}`);
  } catch (err) {
    console.error(`Error generating thumbnail for ${title}:`, err);
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
      const baseName = path.basename(pdfFile, '.pdf');
      const thumbnailPath = path.join(THUMBNAIL_DIR, `${baseName}-thumbnail.png`);
      const title = titles[baseName] || baseName.replace(/-/g, ' ');
      
      await generateSimpleThumbnail(thumbnailPath, title);
    }
    
    console.log('All thumbnails generated successfully');
  } catch (err) {
    console.error('Error processing PDFs:', err);
  }
}

// Run the script
processPDFs(); 