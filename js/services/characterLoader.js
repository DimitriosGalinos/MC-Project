const characterLoader = {};

function loadCharacterSetForLanguage(language) {
    switch (language) {
      case 'korean':
        return loadKoreanCharacters();
      case 'japanese':
        return loadJapaneseCharacters();
      default:
        throw 'Unsupported language';
    }
}

function loadKoreanCharacters() {
    return {
      a: 'ㅏ',
      o: 'ㅗ',
      yo: 'ㅛ',
      yu: 'ㅠ'
    }
}

function loadJapaneseCharacters() {
    return {
      a: 'あ',
      gu: 'こ',
      ki: 'り',
      ma: 'ま'
    }
}

characterLoader.loadCharacterSetForLanguage = loadCharacterSetForLanguage;

export default characterLoader
