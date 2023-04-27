import io
import os
from google.cloud import vision_v1
from google.cloud.vision_v1 import types

# Set your service account key file path
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "C:\Users\ghaff\Documents\0.P FILES\API JSON FILE\my-project-z0-c06ac9ffbf00.json"

# Initialize the client
client = vision_v1.ImageAnnotatorClient()

# Read the screenshot image file
with io.open("C:/Users/ghaff/Documents/0.P FILES/Z PROJECTS/public/placeholder.png", "rb") as image_file:
    content = image_file.read()

# Send the image content to the Cloud Vision API
image = types.Image(content=content)
response = client.text_detection(image=image)
texts = response.text_annotations

# Extract the text from the response
extracted_text = ""
for text in texts:
    extracted_text +=text.description

# Print the extracted text
print(extracted_text)