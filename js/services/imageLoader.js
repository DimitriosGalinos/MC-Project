
const imageLoader = {};

function loadCharacterTrackingImagesForLanguage(language) {
  switch (language) {
    case 'korean':
      return loadKoreanCharacterTrackingImages();
    case 'japanese':
      return loadJapaneseCharacterTrackingImages();
    default:
      throw 'Unsupported language';
  }
}

function loadCharacterSelectImagesForLanguage(language) {
  switch (language) {
    case 'korean':
      return loadKoreanCharacterSelectImages();
    case 'japanese':
      return loadJapaneseCharacterSelectImages();
    default:
      throw 'Unsupported language';
  }
}

function loadKoreanCharacterSelectImages() {
  return {
    a: require('../../img/characters/korean/a.jpg'),
    o: require('../../img/characters/korean/o.jpg'),
    yo: require('../../img/characters/korean/yo.jpg'),
    yu: require('../../img/characters/korean/yu.jpg')
  }
}

function loadJapaneseCharacterSelectImages() {
  return {
    a: require('../../img/characters/japanese/a.png'),
    ko: require('../../img/characters/japanese/ko.png'),
    l: require('../../img/characters/japanese/l.jpg'),
    ma: require('../../img/characters/japanese/ma.png')
  }
}

function loadKoreanCharacterTrackingImages() {
  return {
    a: {
      a1: require('../res/languages/korean/a/a1.jpg'),
      a2: require('../res/languages/korean/a/a2.jpg'),
      a3: require('../res/languages/korean/a/a3.jpg'),
      a4: require('../res/languages/korean/a/a4.jpg'),
      a5: require('../res/languages/korean/a/a5.jpg')
    },
    o: {
      o1: require('../res/languages/korean/o/o1.jpg'),
      o2: require('../res/languages/korean/o/o2.jpg'),
      o3: require('../res/languages/korean/o/o3.jpg'),
      o4: require('../res/languages/korean/o/o4.jpg'),
      o5: require('../res/languages/korean/o/o5.jpg')
    },
    yo: {
      yo1: require('../res/languages/korean/yo/yo1.jpg'),
      yo2: require('../res/languages/korean/yo/yo2.jpg'),
      yo3: require('../res/languages/korean/yo/yo3.jpg'),
      yo4: require('../res/languages/korean/yo/yo4.jpg'),
      yo5: require('../res/languages/korean/yo/yo5.jpg')
    },
    yu: {
      yu1: require('../res/languages/korean/yu/yu1.jpg'),
      yu2: require('../res/languages/korean/yu/yu2.jpg'),
      yu3: require('../res/languages/korean/yu/yu3.jpg'),
      yu4: require('../res/languages/korean/yu/yu4.jpg'),
      yu5: require('../res/languages/korean/yu/yu5.jpg')
    }
  }
}

function loadJapaneseCharacterTrackingImages() {
  return {
    a: {
      a1: require('../res/languages/japanese/a/a1.jpg'),
      a2: require('../res/languages/japanese/a/a2.jpg'),
      a3: require('../res/languages/japanese/a/a3.jpg'),
      a4: require('../res/languages/japanese/a/a4.jpg'),
      a5: require('../res/languages/japanese/a/a5.jpg')
    },
    gu: {
      gu1: require('../res/languages/japanese/gu/gu1.jpg'),
      gu2: require('../res/languages/japanese/gu/gu2.jpg'),
      gu3: require('../res/languages/japanese/gu/gu3.jpg'),
      gu4: require('../res/languages/japanese/gu/gu4.jpg'),
      gu5: require('../res/languages/japanese/gu/gu5.jpg')
    },
    ma: {
      ma1: require('../res/languages/japanese/ma/ma1.jpg'),
      ma2: require('../res/languages/japanese/ma/ma2.jpg'),
      ma3: require('../res/languages/japanese/ma/ma3.jpg'),
      ma4: require('../res/languages/japanese/ma/ma4.jpg'),
      ma5: require('../res/languages/japanese/ma/ma5.jpg')
    },
    ki: {
      ki1: require('../res/languages/japanese/ki/ki1.jpg'),
      ki2: require('../res/languages/japanese/ki/ki2.jpg'),
      ki3: require('../res/languages/japanese/ki/ki3.jpg'),
      ki4: require('../res/languages/japanese/ki/ki4.jpg'),
      ki5: require('../res/languages/japanese/ki/ki5.jpg')
    },
  }
}

imageLoader.loadCharacterTrackingImagesForLanguage = loadCharacterTrackingImagesForLanguage;
imageLoader.loadCharacterSelectImagesForLanguage = loadCharacterSelectImagesForLanguage;

export default imageLoader
