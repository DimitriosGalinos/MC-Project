'use strict';

import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroMaterials,
  ViroBox,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARPlaneSelector,
  ViroNode,
  ViroAnimations,
  ViroImage,
  ViroARImageMarker,
  ViroARTrackingTargets
} from 'react-viro';

import imageLoader from './services/imageLoader';

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR...",
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
	   // REMEMBER TO BIND EVERY FUNCTION!!
    this._onTappedIcecream = this._onTappedIcecream.bind(this);
	  this._getImageMarkers = this._getImageMarkers.bind(this);
    this._removeCharacterTagets = this._removeCharacterTagets.bind(this);
    this._registerCharacterTagets = this._registerCharacterTagets.bind(this);
  }

// Viroplane visualizes planes and if you click them they disappear
// ViroNode tries to automatically make the image interactive with w.e planes are recognized
// Viro text => text
// ViroAmbientLight & ViroSpotLight are needed for 3D objects, because they don't work without light
// Viro Animation
// Viro 2D image sample (2D is probably not the way to go)
  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >

    		<ViroARPlaneSelector />

        <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />

    		<ViroNode position={[0,0,-1]} dragType="FixedToWorld" onDrag={()=>{}} >
    			<ViroImage
    				height={0.2}
    				width={0.2}
    				source={require('./res/emojis_n_shit/icon_close.png')}
    			 />
    		</ViroNode>

        {this._getImageMarkers()}

	  </ViroARScene>
    );
  }

  _getImageMarkers() {
    const char = this.props.character;
    const language = this.props.language;
    this._registerCharacterTagets(language, char);
    return (
      <View>
        <ViroARImageMarker target={"c1"} onAnchorFound={() => alert(char + "1")}>
        </ViroARImageMarker>
        <ViroARImageMarker target={"c2"} onAnchorFound={() => alert(char + "2")}>
        </ViroARImageMarker>
        <ViroARImageMarker target={"c3"} onAnchorFound={() => alert(char + "3")}>
        </ViroARImageMarker>
        <ViroARImageMarker target={"c4"} onAnchorFound={() => alert(char + "4")}>
        </ViroARImageMarker>
        <ViroARImageMarker target={"c5"} onAnchorFound={() => alert(char + "5")}>
        </ViroARImageMarker>
      </View>
    )
  }

  _registerCharacterTagets(language, char) {
    var allImages = imageLoader.loadCharacterTrackingImagesForLanguage(language);
    var imagesForChar = allImages[char];

    ViroARTrackingTargets.createTargets({
      'c1' : {
        source : imagesForChar[char + '1'],
        orientation : "Up",
        physicalWidth : 0.015, // real world width in meters
        type: 'image'
      },
      'c2' : {
        source : imagesForChar[char + '2'],
        orientation : "Up",
        physicalWidth : 0.015, // real world width in meters
        type: 'image'
      },
      'c3' : {
        source : imagesForChar[char + '3'],
        orientation : "Up",
        physicalWidth : 0.015, // real world width in meters
        type: 'image'
      },
      'c4' : {
        source : imagesForChar[char + '4'],
        orientation : "Up",
        physicalWidth : 0.015, // real world width in meters
        type: 'image'
      },
      'c5' : {
        source : imagesForChar[char + '5'],
        orientation : "Up",
        physicalWidth : 0.015, // real world width in meters
        type: 'image'
      }
    });
  }

  _removeCharacterTagets(char) {
    for (var i = 1; i <= 5 ; i++) {
      var targetName = char + i
      ViroARTrackingTargets.deleteTarget(targetName);
    }
  }

// text class
  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : "I hate cheese"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }

  // On-tap action
  _onTappedIcecream() {
    this.setState({
      runAnimation : !this.state.runAnimation,
    })
  }
}

// text styling
var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 10,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

module.exports = HelloWorldSceneAR;
