
const soundLoader = {};

function loadCharacterSoundsForLanguage(language) {
  switch (language) {
    case 'japanese':
      return loadJapaneseCharacterSounds();
    default:
      throw 'Unsupported language';
  }
}

function loadJapaneseCharacterSounds() {
  return {
    a: require('../res/sounds/languages/japanese/a.mp3'),
    gu: require('../res/sounds/languages/japanese/ko.mp3'),
    ki: require('../res/sounds/languages/japanese/ki.mp3'),
    ma: require('../res/sounds/languages/japanese/ma.mp3')
  }
}

soundLoader.loadCharacterSoundsForLanguage = loadCharacterSoundsForLanguage;

export default soundLoader
