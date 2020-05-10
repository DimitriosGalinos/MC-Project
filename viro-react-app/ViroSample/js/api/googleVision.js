import React from 'react';

const visionEndpoint = 'https://eu-vision.googleapis.com/v1/images:annotate';
const apiKey = 'AIzaSyC2hoD4qJtMXfgNsFcSLShGw4bK3KGVxiE';

const visionApi = {};

async function getTextFromImage(imageAsBase64, language) {
  var response = await fetch(visionEndpoint + "?key=" + apiKey, {
    method: 'POST',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "requests": [
        {
          "features": [
            {
              "type": "DOCUMENT_TEXT_DETECTION"
            }
          ],
          "imageContext": {
            "languageHints": ["da-t-i0-handwrit"]
          },
          "image": {
            "content": imageAsBase64
          }
        }
      ]
    })
  });

  return response.json();
}

visionApi.getTextFromImage = getTextFromImage;

export default visionApi
