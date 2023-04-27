const { default: html2canvas } = require("html2canvas");

const screenshotButton = document.querySelector('#screenshot-button');
const screenshotImg = document.querySelector('#screenshot-img');

screenshotButton.addEventListener('click', () => {
html2canvas(document.body).then(canvas => {
  //Convert canvas to data URL
  const data = canvas.toDataURL();

  //Set the "src" attribute of the image tag to the data URL
  screenshotImg.src = data;
}).catch(error => {
  //Handle errors here
})
});