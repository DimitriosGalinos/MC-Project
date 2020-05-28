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
var InitialARScene2 = require('./js/HelloWorldSceneAR2');

var UNSET = "UNSET";
var AR_NAVIGATOR_TYPE = "AR";
var AR_NAVIGATOR_TYPE2 = "AR2";

// This determines which type of experience to launch in, or UNSET, if the user should
// be presented with a choice of AR or VR. By default, we offer the user a choice.
var defaultNavigatorType = UNSET;

export default class ViroSample extends Component {
  constructor() {
    super();

    this.state = {
      navigatorType : defaultNavigatorType,
      sharedProps : sharedProps
    }
    this._getExperienceSelector = this._getExperienceSelector.bind(this);
    this._getARNavigator = this._getARNavigator.bind(this);
	  this._getARNavigator2 = this._getARNavigator2.bind(this);
    this._getExperienceButtonOnPress = this._getExperienceButtonOnPress.bind(this);
    this._exitViro = this._exitViro.bind(this);
  }

  // Replace this function with the contents of _getVRNavigator() or _getARNavigator()
  // if you are building a specific type of experience.
  render() {
    if (this.state.navigatorType == UNSET) {
      return this._getExperienceSelector();
    } else if (this.state.navigatorType == AR_NAVIGATOR_TYPE) {
      return this._getARNavigator();
    } else if (this.state.navigatorType == AR_NAVIGATOR_TYPE2) {
      return this._getARNavigator2();
    }
  }

  // Presents the user with a choice of an AR or VR experience
  _getExperienceSelector() {
    return (
      <View style={styles.container} >
        <View style={styles.innerContainer}>
          <Image source={require('./img/image.png')}
            style={styles.mainImage} />
          <Text style={styles.titleText}>
            Learning languages made fun.
          </Text>
          <Text style={styles.subtitleText}>
            There was never a better time to learn languages.
          </Text>
          <TouchableHighlight style={styles.button}
            onPress={this._getExperienceButtonOnPress(AR_NAVIGATOR_TYPE2)}
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
      <ViroARSceneNavigator {...this.state.sharedProps}
        initialScene={{scene: InitialARScene}} />
    );
  }
 
   // Returns the ViroARSceneNavigator which will start the AR experience
  _getARNavigator2() {
    return (
      <ViroARSceneNavigator {...this.state.sharedProps}
        initialScene={{scene: InitialARScene2}} />
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
      navigatorType : UNSET
    })
  }
}

var styles = StyleSheet.create({
  viroContainer:{
    flex : 1,
    backgroundColor: "white",
  },
  container: {
    flex : 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  innerContainer: {
    flex : 1,
    flexDirection: 'column',
    alignItems:'center',
    backgroundColor: "white",
    flex: 0.8
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color:'#000',
    textAlign:'left',
    fontSize : 30,
    fontFamily: 'Iowan Old Style'
  },
  subtitleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color:'#7c7c7c',
    textAlign:'left',
    fontSize : 18,
  },
  buttonText: {
    color:'#fff',
    textAlign:'left',
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
  }
});

module.exports = ViroSample
