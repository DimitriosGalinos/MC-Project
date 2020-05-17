import React from 'react';
// relative path is bad practice. A solution if this becomes a problem:
// https://dev-yakuza.github.io/en/react-native/root-import/
import visionApi from '../api/googleVision';

const imageTextExtractor = {};

async function detectSymbols(imageAsBase64) {

  var symbols = {};

  var json = await visionApi.getTextFromImage(imageAsBase64);
  console.log(json);

  findAllSymbols(json, symbols);

  return symbols;
}

function findAllSymbols(obj, symbols) {

  for (let key in obj) {
    if (typeof obj[key] === 'object') {
      findAllSymbols(obj[key], symbols);
    }
  }

  if (obj["text"] && obj["text"].length === 1) {
    var char = obj["text"];

    if (char in symbols)
      symbols[char] += 1;
    else
      symbols[char] = 1;

    return;
  }
}

imageTextExtractor.detectSymbols = detectSymbols;

export default imageTextExtractor
