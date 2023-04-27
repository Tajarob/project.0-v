const path = require('path');
const html = require('html-loader!./index.html');

document.body.innerHTML = html;

const html2canvas = require('html2canvas');
const { textAlign } = require('html2canvas/dist/types/css/property-descriptors/text-align');
const fetch = require('node-fetch');

process.env.GOOGLE_APPLICATION_CREDENTIALS = 'C:/Users/ghaff/Documents/0.P FILES/API JSON FILE/my-project-z0-c06ac9ffbf00.json';

const screenshotButton = document.querySelector('#screenshot-button');
const screenshotImg = document.querySelector('#screenshot-img');

screenshotButton.addEventListener('click', () => {
html2canvas(document.body).then(canvas => {
  //Convert canvas to data URL
  const data = canvas.toDataURL();

  //Set the "src" attribute of the image tag to the data URL
  screenshotImg.src = data;

  // Send the screenshot file to the server
  fetch('/extract-text', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      screenshot: data
    })
  }).then(response => {
    return response.text();
  }).then(extractedText => {
    console.log(extractedText);
  }).catch(error => {
    console.error(error);
  });
}).catch(error => {
  //Handle errors here
  console.error(error);
})
});

async function extractTextFromImage(screenshotData) {
  const vision = require('@google-cloud/vision');
  const client = new vision.ImageAnnotatorClient({
    keyFilename: 'C:/Users/ghaff/Documents/0.P FILES/API JSON FILE/my-project-z0-c06ac9ffbf00.json'
  });

  // Convert the screenshot data to a buffer
  const screenshotBuffer = Buffer.from(screenshotData.replace(/^data:image\/\w+;base64,/, ""), 'base64');

  // Send the image content to the Cloud Vision API
  const [result] = await client.textDetection(screenshotBuffer);
  const textAnnotations = result.textAnnotations;
  const text = textAnnotations[0].description;

  // Extract the text from the response
  let extractedText = "";
  for (const annotation of textAnnotations) {
    extractedText += annotation.description;
  }

  return text;
};


module.exports.extractTextFromImage = extractTextFromImage;