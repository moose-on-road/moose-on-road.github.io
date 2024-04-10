document.addEventListener('DOMContentLoaded', function() {
    // Function to extract the relevant part of the URL
    function extractFileNameFromURL() {
        const parts = window.location.pathname.split('/');
        const fileName = parts.pop() || parts.pop();  // Handle potential trailing slash
        return fileName;
    }

    // Function to construct the URL for embedding the 3D model (.glb file)
    function constructEmbedURL(fileName) {
        return `https://moose-on-road.github.io/3DFiles/${fileName}.glb`;
    }

    // Function to construct the URL for the poster image (.webp file)
    function constructEmbedpURL(fileName) {
        return `https://moose-on-road.github.io/3DFiles/${fileName}.webp`;
    }

    // Extract the file name from the current URL
    const fileName = extractFileNameFromURL();

    // Construct the embed URLs
    const embedURL = constructEmbedURL(fileName);
    const embedpURL = constructEmbedpURL(fileName);

    // Assuming 'model-viewer' is the ID of your 3D model viewer element
    const modelViewer = document.getElementById('model-viewer');
    if (modelViewer) {
        modelViewer.setAttribute('src', embedURL);
        modelViewer.setAttribute('poster', embedpURL);
    }
});