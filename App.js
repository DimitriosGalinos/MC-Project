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

import imageLoader from './js/services/imageLoader';

/*
 TODO: Insert your API key below
 */
var sharedProps = {
  apiKey:"API_KEY_HERE",
}

// Sets the default scene you want for AR and VR
var InitialARScene = require('./js/HelloWorldSceneAR');

const navigator = {
  home: 0,
  language_selector: 1,
  character_selector: 2,
  ar: 3
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
      character: null,
      characterDataSource: null,
      error: null,
    }

    this._getExperienceSelector = this._getExperienceSelector.bind(this);
    this._getARNavigator = this._getARNavigator.bind(this);
    this._getExperienceButtonOnPress = this._getExperienceButtonOnPress.bind(this);
    this._exitViro = this._exitViro.bind(this);
    this._setLanguage = this._setLanguage.bind(this);
    this._setCharacter = this._setCharacter.bind(this);
    this._getCharacterItem = this._getCharacterItem.bind(this);
    this._getSelector = this._getSelector.bind(this);
    this._getDeselectButton = this._getDeselectButton.bind(this);
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
          {this._getDeselectButton()}
          <View style={{height:430, width: "100%"}}>
            {this._getSelector()}
          </View>
          <Text style={styles.titleText}>
            Learning languages made fun!
          </Text>
          <Text style={styles.subtitleText}>
            There was never a better time to learn a new language
          </Text>
          {this._getErrorText()}
          <TouchableHighlight style={styles.learnButton}
            onPress={this._getExperienceButtonOnPress(navigator.ar)}
            underlayColor={'#353535'} >
            <Text style={styles.buttonText}>START LEARNING</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  _getDeselectButton() {
    if (this.state.language) {
      return (
        <TouchableHighlight style={styles.backButton} onPress={() => this.setState({language: null, character: null})}>
          <Text style={styles.buttonText}>Choose another language</Text>
        </TouchableHighlight>
      )
    }
  }

  _getSelector() {
    if (!this.state.language) {
      return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
          <View style={{flex:1, flexDirection:'column', justifyContent:'center'}}>
            <TouchableOpacity onPress={() => this._setLanguage('japanese')}>
              <Image source={require('./img/flags/japan.png')}
                style={styles.languageImage} />
              <Text style={styles.languageName}>JAPANESE</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex:1, flexDirection:'column', justifyContent:'center'}}>
            <TouchableOpacity onPress={() => this._setLanguage('korean')}>
              <Image source={require('./img/flags/south-korea.png')}
                style={styles.languageImage} />
              <Text style={styles.languageName}>KOREAN</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
    }

    return (
      <FlatList
        style={{margin:0}}
        data={this.state.characterDataSource}
        renderItem={({ item }) => this._getCharacterItem(item)}
        numColumns={4}
        keyExtractor={item => item.id}
      />
    );
  }

  _getCharacterItem(item) {
    if (item.id == this.state.character) {
      return (
        <TouchableOpacity style={styles.highlightedCharacterButton} onPress={() => this._setCharacter(item.id)}>
          <Image source={item.source} style={{maxWidth: "100%", maxHeight: "100%"}}/>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity style={styles.characterButton} onPress={() => this._setCharacter(item.id)}>
        <Image source={item.source} style={{maxWidth: "100%", maxHeight: "100%"}}/>
      </TouchableOpacity>
    );
  }

  _setLanguage(language) {
    var selectImages = imageLoader.loadCharacterSelectImagesForLanguage(language);
    var dataSource = [];
    for (var key in selectImages) {
      dataSource.push({source: selectImages[key], id: key});
    }

    this.setState({
      language: language,
      characterDataSource: dataSource
    });
  }

  _setCharacter(character) {
    this.setState({
      character: character
    });
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
              passProps: {language: this.state.language, character: this.state.character, nextButtonPresses: this.state.nextButtonPresses}}}
              numberOfTrackedImages={5} autofocus={true}/>
        <TouchableOpacity onPress={() => this._exitViro()} style={styles.menuButton}><Text>Menu</Text></TouchableOpacity>
      </View>
    );
  }

  // This function returns an anonymous/lambda function to be used
  // by the experience selector buttons
  _getExperienceButtonOnPress(navigatorType) {
    if (!this.state.language || !this.state.character) {
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
    width: 50,
    height: 35,
    borderRadius: 20,
    top: 40,
    left: 10,
    backgroundColor: 'white',
    color: 'black',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    fontSize: 12
  },
  container: {
    flex : 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  innerContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: "white",
    flex: 0.8
  },
  titleText: {
    paddingTop: 30,
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
    lineHeight: 20
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
    marginTop: 15,
    marginBottom: 50,
    position: 'absolute',
    bottom:0,
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
  characterButton: {
    flex: 1,
    flexDirection: 'column',
    height: 75,
    margin: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.2)',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'rgba(52, 52, 52, 0.0)'
  },
  highlightedCharacterButton: {
    flex: 1,
    flexDirection: 'column',
    height: 75,
    margin: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.2)',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'orange'
  },
  languageName: {
    width: "100%",
    textAlign:'center',
    color:'#7c7c7c',
    fontSize : 12,
    fontWeight: 'bold',
    letterSpacing: 2.5,
    marginTop: -30
  }
});

module.exports = ViroSample
