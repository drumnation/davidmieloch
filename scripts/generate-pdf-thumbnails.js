const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { execSync } = require('child_process');
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

// Generate PDF cover thumbnails with document title overlay
async function generatePdfThumbnail(outputPath, title, pdfTitle) {
  try {
    // Create a 400x550 rectangle with light color background
    const width = 400;
    const height = 550;
    
    // Create a solid color SVG with text and a realistic PDF icon
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
          ${pdfTitle.length > 35 ? pdfTitle.substring(0, 32) + '...' : pdfTitle}
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
      
    console.log(`Created enhanced thumbnail for ${title}: ${outputPath}`);
    return true;
  } catch (err) {
    console.error(`Error generating thumbnail for ${title}:`, err);
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
        
        // Try to extract PDF metadata
        let pdfTitle = title;
        try {
          const pdfBytes = fs.readFileSync(pdfPath);
          const pdfDoc = await PDFDocument.load(pdfBytes);
          const { Title } = pdfDoc.getTitle() ? { Title: pdfDoc.getTitle() } : { Title: title };
          if (Title && Title.trim() !== '') {
            pdfTitle = Title;
          }
        } catch (err) {
          console.error(`Error extracting PDF metadata: ${err.message}`);
        }
        
        // Generate an enhanced thumbnail with more realistic PDF appearance
        await generatePdfThumbnail(thumbnailPath, title, pdfTitle);
      } else {
        console.log(`PDF file not found: ${pdfPath}`);
        await generatePdfThumbnail(thumbnailPath, title, title);
      }
    }
    
    console.log('All thumbnails generated successfully');
  } catch (err) {
    console.error('Error processing PDFs:', err);
  }
}

// Run the script
processPDFs(); 