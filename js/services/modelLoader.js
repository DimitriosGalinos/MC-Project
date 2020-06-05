
const modelLoader = {};

function loadCharacterModelsForLanguage(language) {
  switch (language) {
    case 'japanese':
      return loadJapaneseCharacterModels();
    default:
      throw 'Unsupported language';
  }
}

function loadJapaneseCharacterModels() {
  return {
    a: {
      numberOfStrokes: 4,
      1: {obj: require('../res/characterModels/japanese/a/1.obj'),
           mtl: require('../res/characterModels/japanese/a/1.obj.mtl')},
      2: {obj: require('../res/characterModels/japanese/a/2.obj'),
           mtl: require('../res/characterModels/japanese/a/2.obj.mtl')},
      3: {obj: require('../res/characterModels/japanese/a/3.obj'),
           mtl: require('../res/characterModels/japanese/a/3.obj.mtl')},
      4: {obj: require('../res/characterModels/japanese/a/4.obj'),
           mtl: require('../res/characterModels/japanese/a/4.obj.mtl')},
    },
    gu: {
      numberOfStrokes: 4,
      1: {obj: require('../res/characterModels/japanese/gu/1.obj'),
            mtl: require('../res/characterModels/japanese/gu/1.obj.mtl')},
      2: {obj: require('../res/characterModels/japanese/gu/2.obj'),
            mtl: require('../res/characterModels/japanese/gu/2.obj.mtl')},
      3: {obj: require('../res/characterModels/japanese/gu/3.obj'),
            mtl: require('../res/characterModels/japanese/gu/3.obj.mtl')},
      4: {obj: require('../res/characterModels/japanese/gu/4.obj'),
            mtl: require('../res/characterModels/japanese/gu/4.obj.mtl')},
    },
    ki: {
      numberOfStrokes: 4,
      1: {obj: require('../res/characterModels/japanese/ki/1.obj'),
            mtl: require('../res/characterModels/japanese/ki/1.obj.mtl')},
      2: {obj: require('../res/characterModels/japanese/ki/2.obj'),
            mtl: require('../res/characterModels/japanese/ki/2.obj.mtl')},
      3: {obj: require('../res/characterModels/japanese/ki/3.obj'),
            mtl: require('../res/characterModels/japanese/ki/3.obj.mtl')},
      4: {obj: require('../res/characterModels/japanese/ki/4.obj'),
            mtl: require('../res/characterModels/japanese/ki/4.obj.mtl')},
    },
    ma: {
      numberOfStrokes: 4,
      1: {obj: require('../res/characterModels/japanese/ma/1.obj'),
            mtl: require('../res/characterModels/japanese/ma/1.obj.mtl')},
      2: {obj: require('../res/characterModels/japanese/ma/2.obj'),
            mtl: require('../res/characterModels/japanese/ma/2.obj.mtl')},
      3: {obj: require('../res/characterModels/japanese/ma/3.obj'),
            mtl: require('../res/characterModels/japanese/ma/3.obj.mtl')},
      4: {obj: require('../res/characterModels/japanese/ma/4.obj'),
            mtl: require('../res/characterModels/japanese/ma/4.obj.mtl')},
    }
  }
}

modelLoader.loadCharacterModelsForLanguage = loadCharacterModelsForLanguage;

export default modelLoader
