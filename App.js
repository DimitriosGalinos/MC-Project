/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  PixelRatio,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  SafeAreaView
} from 'react-native';

import {
  ViroARSceneNavigator
} from 'react-viro';

import characterLoader from './js/services/characterLoader';

/*
 TODO: Insert your API key below
 */
var sharedProps = {
  apiKey:"API_KEY_HERE",
}

// Sets the default scene you want for AR and VR
var InitialARScene = require('./js/LearnSceneAR');

const navigator = {
  home: 0,
  ar: 1
}

// This determines which type of experience to launch in, or UNSET, if the user should
// be presented with a choice of AR or VR. By default, we offer the user a choice.
var defaultNavigatorType = navigator.home;

export default class ViroSample extends Component {
  constructor() {
    super();

    this.state = {
      navigatorType : defaultNavigatorType,
      sharedProps : sharedProps,
      language: null,
      characterId: null,
      characterDataSource: null,
      error: null,
    }

    this._getExperienceSelector = this._getExperienceSelector.bind(this);
    this._getARNavigator = this._getARNavigator.bind(this);
    this._getExperienceButtonOnPress = this._getExperienceButtonOnPress.bind(this);
    this._exitViro = this._exitViro.bind(this);
    this._setLanguage = this._setLanguage.bind(this);
    this._setCharacterId = this._setCharacterId.bind(this);
    this._getCharacterItem = this._getCharacterItem.bind(this);
    this._getSelector = this._getSelector.bind(this);
    this._getErrorText = this._getErrorText.bind(this);
  }

  // Replace this function with the contents of _getVRNavigator() or _getARNavigator()
  // if you are building a specific type of experience.
  render() {
    if (this.state.navigatorType == navigator.home) {
      return this._getExperienceSelector();
    } else if (this.state.navigatorType == navigator.ar) {
      return this._getARNavigator();
    }
  }

  // Presents the user with a choice of an AR or VR experience
  _getExperienceSelector() {
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.header}>
            <Image source={require('./img/logo.png')}
              style={styles.logoImage} />
          </View>
          {this._getErrorText()}
          <View style={{height:"100%", width: "100%"}}>
            {this._getSelector()}
          </View>
        </View>
      </View>
    );
  }


  _getDeselectButton() {
    if (this.state.language) {
      return (
        <TouchableHighlight style={styles.anotherLanguageButton} onPress={() => this.setState({language: null, characterId: null})}>
          <Text style={styles.buttonAnotherLanguageText}>Choose another language</Text>
        </TouchableHighlight>
      )
    }
  }

  _getSelector() {
    if (!this.state.language) {
      return (
        <View>
           <Text style={styles.titleText}>
        Learning languages made fun!
        </Text>
        <Text style={styles.subtitleText}>
          There was never a better time to learn a new language
        </Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}
        style={{ paddingBottom: 60}}>
          <View style={{flex:1, flexDirection:'column', justifyContent:'center', height: "100%", paddingBottom: 60}}>
            <TouchableOpacity onPress={() => this._setLanguage('japanese')}>
              <Image source={require('./img/flags/japan.png')}
                style={styles.languageImage} />
              <Text style={styles.languageName}>JAPANESE</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex:1, flexDirection:'column', justifyContent:'center', height: "100%", paddingBottom: 60}}>
            <TouchableOpacity onPress={() => this._setLanguage('korean')}>
              <Image source={require('./img/flags/south-korea.png')}
                style={styles.languageImage} />
              <Text style={styles.languageName}>KOREAN</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        </View>
      );
    }

    return (
      <View style={styles.characterSelectorContainer}>
         <TouchableOpacity style={styles.anotherLanguageButton} onPress={() => this.setState({language: null, character: null})}>
          <Image source={require('./img/back.png')} style={styles.backIcon}/>
          <Text style={styles.buttonAnotherLanguageText}>Choose another language </Text>
        </TouchableOpacity>
      <FlatList
        style={{ flexGrow: 1 }}
        data={this.state.characterDataSource}
        renderItem={({ item }) => this._getCharacterItem(item)}
        numColumns={4}
        keyExtractor={item => item.id}
      />
       <TouchableHighlight style={styles.learnButton}
            onPress={this._getExperienceButtonOnPress(navigator.ar)}
            underlayColor={'#353535'} >
            <Text style={styles.buttonText}>START LEARNING</Text>
          </TouchableHighlight>
      </View>
    );
  }

  _getCharacterItem(item) {
    if (item.id == this.state.characterId) {
      return (
        <TouchableOpacity style={styles.highlightedCharacterButton} onPress={() => this._setCharacterId(item.id)}>
           <Text style={styles.character}>{item.character}</Text>
           <Text style={styles.characterLatin}>{item.id}</Text>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity style={styles.characterButton} onPress={() => this._setCharacterId(item.id)}>
        <Text style={styles.character}>{item.character}</Text>
        <Text style={styles.characterLatin}>{item.id}</Text>
      </TouchableOpacity>
    );
  }

  _setLanguage(language) {
    var characterSet = characterLoader.loadCharacterSetForLanguage(language);
    var dataSource = [];
    for (var key in characterSet) {
      dataSource.push({character: characterSet[key], id: key});
    }

    this.setState({
      language: language,
      characterDataSource: dataSource
    });
  }

  _setCharacterId(characterId) {
    this.setState({
      characterId: characterId
    });
  }

  _getOrderedCharacterIds(firstChar) {
    var characterSet = characterLoader.loadCharacterSetForLanguage(this.state.language);
    var ids = Object.keys(characterSet);
    ids = ids.filter(e => e !== firstChar);
    ids = [firstChar].concat(ids);
    return ids;
  }

  _getErrorText() {
    if (!this.state.error)
      return;

    return (
      <Text style={{color:'red', fontSize: 12, fontWeight: 'bold', width:"100%"}}>{this.state.error}</Text>
    );
  }

  // Returns the ViroARSceneNavigator which will start the AR experience
  _getARNavigator() {
    return (
      <View style={styles.viroContainer}>
        <ViroARSceneNavigator {...this.state.sharedProps} initialScene={{scene: InitialARScene,
              passProps: {language: this.state.language, characterIds: this._getOrderedCharacterIds(this.state.characterId),
              nextButtonPresses: this.state.nextButtonPresses, exitButtonRef: this._exitViroButtonRef}}}
              numberOfTrackedImages={5} autofocus={true}/>
        <TouchableOpacity onPress={() => this._exitViro()} style={styles.menuButton}>
          <Image source={require("./img/logout.png")} style={{maxWidth: "100%", maxHeight: "100%"}}/>
        </TouchableOpacity>
      </View>
    );
  }

  // This function returns an anonymous/lambda function to be used
  // by the experience selector buttons
  _getExperienceButtonOnPress(navigatorType) {
    if (!this.state.language || !this.state.characterId) {
      return () => {
        this.setState({
          error : 'You must choose a language and a character'
        })
      }
    }

    return () => {
      this.setState({
        navigatorType : navigatorType
      })
    }
  }

  // This function "exits" Viro by setting the navigatorType to UNSET.
  _exitViro() {
    this.setState({
      navigatorType : navigator.home
    })
  }
}

var styles = StyleSheet.create({
  viroContainer:{
    flex : 1,
    backgroundColor: 'rgba(52, 52, 52, 0.0)'
  },
  menuButton: {
    position: 'absolute',
    width: 40,
    height: 40,
    top: 40,
    left: 10,
  },
  playCharacterSoundButton: {
    position: 'absolute',
    width: 40,
    height: 40,
    top: 90,
    left: 10,
  },
  container: {
    flex : 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    height: "100%"
  },
  innerContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: "white",
    flex: 0.8,
    height: '100%'
  },
  titleText: {
    paddingTop: 60,
    paddingBottom: 5,
    color:'#000',
    textAlign:'left',
    fontSize : 30,
    fontWeight: 'bold',
    fontFamily: 'Iowan Old Style'
  },
  subtitleText: {
    paddingTop: 10,
    paddingBottom: 0,
    color:'#7c7c7c',
    textAlign:'left',
    fontSize : 16,
    lineHeight: 20,
    paddingBottom: 30
  },
  buttonText: {
    color:'#fff',
    textAlign:'center',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 2.5
  },
  learnButton: {
    padding: 20,
    borderRadius: 20,
    backgroundColor:'#000',
    height: 55,
    position: 'absolute',
    bottom: 100,
    width: "100%"
  },
  backButton: {
    padding: 20,
    borderRadius: 20,
    backgroundColor:'#000',
    height: 55,
    marginTop: 15,
    marginBottom: 5,
    width: "100%"
  },
  languageImage: {
    width: 260,
    height: 350,
    borderRadius: 30,
    backgroundColor: "#e5e1e2",
    marginRight: 20
  },
  logoImage: {
    width: 60,
    height: 15
  },
  header: {
    borderBottomColor: '#e3e3e3',
    borderBottomWidth: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 40,
    paddingBottom: 20,
    marginLeft: -7,
    width: "100%"
  },
  character: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30
  },
  characterLatin: {
    textAlign: 'left',
    fontSize: 12,
    color: '#e64437',
    fontWeight: 'bold',
    paddingLeft: 8,
    marginBottom: -18
  },
  characterButton: {
    flex: 1,
    flexDirection: 'column',
    height: 75,
    width: 75,
    margin: 2,
    backgroundColor: '#e5e1e2',
    borderRadius: 11,
    justifyContent: "center",
    borderWidth: 2,
    borderColor: 'white',
  },
  highlightedCharacterButton: {
    flex: 1,
    flexDirection: 'column',
    height: 75,
    width: 75,
    borderWidth: 2,
    borderRadius: 11,
    borderColor: '#ebadaa',
    backgroundColor: '#fff',
    justifyContent: "center",
    margin: 2
  },
  languageName: {
    width: "100%",
    textAlign:'center',
    color:'#7c7c7c',
    fontSize : 12,
    fontWeight: 'bold',
    letterSpacing: 2.5,
    marginTop: -30
  },
  anotherLanguageButton: {
    backgroundColor: 'white',
    justifyContent: "flex-start",
    flexDirection: 'row',
    borderRadius: 20,
    width: "100%",
    marginBottom: 30,
    marginTop: 20
  },
  buttonAnotherLanguageText: {
    color: 'black',
    textAlign: 'left',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 20
  },
  backIcon: {
    width: 15,
    height: 15
  },
  characterSelectorContainer: {
    height: "100%",
    flex: 1
  }
});

module.exports = ViroSample
