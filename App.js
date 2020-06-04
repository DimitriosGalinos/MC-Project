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
  Image
} from 'react-native';

import {
  ViroARSceneNavigator
} from 'react-viro';

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
      sharedProps : sharedProps
    }
    this._getExperienceSelector = this._getExperienceSelector.bind(this);
    this._getARNavigator = this._getARNavigator.bind(this);
    this._getExperienceButtonOnPress = this._getExperienceButtonOnPress.bind(this);
    this._exitViro = this._exitViro.bind(this);
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
          <Image source={require('./img/image.png')}
            style={styles.mainImage} />
          <Text style={styles.titleText}>
            Learning languages made fun!
          </Text>
          <Text style={styles.subtitleText}>
            There was never a better time to learn a new language
          </Text>
          <TouchableHighlight style={styles.button}
            onPress={this._getExperienceButtonOnPress(navigator.ar)}
            underlayColor={'#353535'} >
            <Text style={styles.buttonText}>START LEARNING</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  // Returns the ViroARSceneNavigator which will start the AR experience
  _getARNavigator() {
    return (
      <View style={styles.viroContainer}>
        <ViroARSceneNavigator {...this.state.sharedProps} initialScene={{scene: InitialARScene,
            passProps: {language: 'japanese', character: 'a'}}}
          numberOfTrackedImages={5} autofocus={true} ref={ref => (this._ARSceneNav = ref)}/>
        <TouchableOpacity onPress={() => this._exitViro()} style={styles.menuButton}><Text>Menu</Text></TouchableOpacity>
      </View>
    );
  }

  // This function returns an anonymous/lambda function to be used
  // by the experience selector buttons
  _getExperienceButtonOnPress(navigatorType) {
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
  buttons : {
    height: 80,
    width: 150,
    paddingTop: 20,
    paddingBottom:20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  button: {
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
  exitButton: {
    height: 50,
    width: 100,
    paddingTop:10,
    paddingBottom:10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
  },
  mainImage: {
    width: 350,
    height: 400
  },
  logoImage: {
    width: 60,
    height: 15,
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
  }
});

module.exports = ViroSample
