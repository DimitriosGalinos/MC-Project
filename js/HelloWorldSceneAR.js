'use strict';

import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroARCamera,
  ViroButton,
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
import modelLoader from './services/modelLoader';

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR...",
      currentStroke: 1
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
	   // REMEMBER TO BIND EVERY FUNCTION!!
    this._onTappedIcecream = this._onTappedIcecream.bind(this);
	  this._getImageMarkers = this._getImageMarkers.bind(this);
    this._removeCharacterTagets = this._removeCharacterTagets.bind(this);
    this._registerCharacterTagets = this._registerCharacterTagets.bind(this);
    this._nextStroke = this._nextStroke.bind(this);
    this._getCharacterModel = this._getCharacterModel.bind(this);
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
        <ViroText text={'' + this.state.currentStroke}
            textAlign="left"
            textAlignVertical="top"
            textLineBreakMode="Justify"
            textClipMode="ClipToBounds"
            color="#ff0000"
            width={2} height={2}
            style={{fontFamily:"Arial", fontSize:20, fontWeight:'bold', fontStyle:"italic", color:"#0000FF"}}
            position={[0,0,-5]}/>
  			<ViroAmbientLight color="#FFFFFF" />
  			<ViroSpotLight innerAngle={5} outerAngle={90} direction={[0,-1,-.2]} position={[0, 3, 1]} color="#ffffff" castsShadow={true} />

        {this._getCharacterModel()}
        {this._getImageMarkers()}

       </ViroARScene>
    );
  }

  _getCharacterModel() {
    const char = this.props.character;
    const language = this.props.language;
    const characterModels = modelLoader.loadCharacterModelsForLanguage(language);
    const currentStroke = this.state.currentStroke;
    return (
      <ViroNode position={[0,0,-1]} dragType="FixedToWorld" onDrag={()=>{}} >
        <Viro3DObject
          source={characterModels[char][currentStroke].obj}
          resources={[characterModels[char][currentStroke].mtl]}
          type="OBJ"
          position={[0.0, 0.0, -10]}
          scale={[0.05, 0.05, 0.05]}
          rotation={[0, -45, -90]}
          onClick={() => this._nextStroke()}
        />
      </ViroNode>
    );
  }

  _nextStroke() {
    const char = this.props.character;
    const language = this.props.language;
    const characterModels = modelLoader.loadCharacterModelsForLanguage(language);
    var maxStrokeCount = characterModels[char].numberOfStrokes;
    var currentStroke = this.state.currentStroke;
    if (currentStroke == maxStrokeCount)
      this.setState({currentStroke: 1})
    else
      this.setState({currentStroke: currentStroke + 1})
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
    this._removeCharacterTagets();
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

  _removeCharacterTagets() {
    for (var i = 1; i <= 5 ; i++) {
      var targetName = 'c' + i
      ViroARTrackingTargets.deleteTarget(targetName);
    }
  }

// text class
  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      // handle successfull initialization here
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
