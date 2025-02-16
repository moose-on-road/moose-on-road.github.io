const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function generateThumbnail(modelUrl, outputPath) {
    console.log('Launching browser...');
    const browser = await puppeteer.launch({ headless: false });
    console.log('Browser launched.');

    const page = await browser.newPage();
    console.log('New page created.');

    // Extract the embed path from the modelUrl
    const embedPath = modelUrl.split('/').slice(-2).join('/').replace('.glb', '');

    // Create the HTML content dynamically
    const htmlContent = `
    <html>
    <body>
    <embed src="https://moose-on-road.github.io/products/${embedPath}-dynamic.html" width= "700px" height= "500px"></embed>
    </body>
    </html>
    `;

    // Load the HTML content
    console.log('Setting page content...');
    await page.setContent(htmlContent, { waitUntil: 'networkidle2' });
    console.log('Page content set.');

    // Wait for the embed element to load
    console.log('Waiting for embed element...');
    await page.waitForSelector('embed');
    console.log('Embed element found.');

    // Add a delay to ensure the model loads
    console.log('Waiting for model to load...');
    await new Promise(resolve => setTimeout(resolve, 10000));

    // Capture the screenshot
    console.log('Capturing screenshot...');
    const element = await page.$('embed');
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