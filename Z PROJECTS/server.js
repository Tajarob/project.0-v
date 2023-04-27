const { extractTextFromImage } = require('./text-extractor.js');
const express = require('express');
const bodyParser = require('body-parser');
const app =  express();
const port =  3000;

// Parse JSON request bodies
app.use(bodyParser.json());

// Serve static files from the public directory
app.use(express.static('public'));

// Extract text from screenshot
app.post('/extract-text', async (req, res) => {
  const screenshotData = req.body.screenshot;
  const extractedText = await extractTextFromImage(screenshotData);
  res.send(extractedText);
});

// Start the server
app.listen(port, () => {
  console.log('Server listening on port ${port}');
});