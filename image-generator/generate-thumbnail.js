const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function generateThumbnail(modelUrl, outputPath) {
    console.log('Launching browser...');
    const browser = await puppeteer.launch({ headless: false });
    console.log('Browser launched.');

    const page = await browser.newPage();
    console.log('New page created.');

    // Create the HTML content dynamically
    const htmlContent = `
    <html>
    <body>
    <model-viewer src="${modelUrl}" camera-controls shadow-intensity="1" exposure="2" style="width: 640px; height: 480px;">
    </model-viewer>
    <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js"></script>
    </body>
    </html>
    `;

    // Load the HTML content
    console.log('Setting page content...');
    await page.setContent(htmlContent, { waitUntil: 'networkidle2' });
    console.log('Page content set.');

    // Wait for the model to load
    console.log('Waiting for model-viewer selector...');
    await page.waitForSelector('model-viewer');
    console.log('Model-viewer selector found.');

    // Add a delay to ensure the model loads
    console.log('Waiting for model to load...');
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Capture the screenshot
    console.log('Capturing screenshot...');
    const element = await page.$('model-viewer');
    await element.screenshot({ path: outputPath });
    console.log('Screenshot captured.');

    await browser.close();
    console.log('Browser closed.');
}

const modelUrl = process.argv[2];
const outputPath = process.argv[3];

generateThumbnail(modelUrl, outputPath).then(() => {
    console.log(`Generated thumbnail: ${outputPath}`);
}).catch(err => {
    console.error(err);
});