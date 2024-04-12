
script.onload = function() {
    // Your code that uses Model Viewer goes here
    // This code will run after the Model Viewer library has been loaded// Extract the model attribute value from the iframe
const iframe = document.querySelector('iframe');
const model = iframe.getAttribute('model');

// Define the base URL for the models
const baseModelURL = 'https://moose-on-road.github.io/3DFiles/';

// Define the base URL for the posters
const basePosterURL = 'https://moose-on-road.github.io/3DFiles/';

// Construct the modelURL and posterURL based on the pathname
const modelURL = `${baseModelURL}${model}.glb`;
const posterURL = `${basePosterURL}${model}.webp`;

// Create a new model-viewer element with the dynamically generated URLs
const modelViewerElement = document.createElement('model-viewer');

modelViewerElement.setAttribute('id','dynamicModel');
modelViewerElement.setAttribute('src', modelURL);
modelViewerElement.setAttribute('poster', posterURL);
modelViewerElement.setAttribute('ar', '');
modelViewerElement.setAttribute('ar-modes', 'webxr scene-viewer quick-look');
modelViewerElement.setAttribute('camera-controls', '');
modelViewerElement.setAttribute('skybox-height', '0.5m');
modelViewerElement.setAttribute('shadow-intensity', '1');
modelViewerElement.setAttribute('environment-image', 'https://assets.zyrosite.com/YbNnDP9X9WcwbNGX/aircraft_workshop_01_1k-AE0vD1a53xUr6lBK.hdr');
modelViewerElement.setAttribute('exposure', '1.5');
modelViewerElement.setAttribute('style', 'width: 640px; height: 480px; border: 2px solid #eeeeee;');

document.body.appendChild(modelViewerElement);

};