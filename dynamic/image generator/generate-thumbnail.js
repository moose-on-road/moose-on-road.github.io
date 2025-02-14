const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function generateThumbnail(modelUrl, outputPath) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Create the HTML content dynamically
    const htmlContent = `
    <html>
    <body>
    <model-viewer src="${modelUrl}" ar ar-modes="webxr scene-viewer quick-look" camera-controls shadow-intensity="1" exposure="2" style="width: 640px; height: 480px;">
    </model-viewer>
    <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js"></script>
    </body>
    </html>
    `;

    // Load the HTML content
    await page.setContent(htmlContent, { waitUntil: 'networkidle2' });

    // Wait for the model to load
    await page.waitForSelector('model-viewer');

    // Capture the screenshot
    const element = await page.$('model-viewer');
    await element.screenshot({ path: outputPath });

    await browser.close();
}

const modelUrl = process.argv[2];
const outputPath = process.argv[3];

generateThumbnail(modelUrl, outputPath).then(() => {
    console.log(`Generated thumbnail: ${outputPath}`);
}).catch(err => {
    console.error(err);
});