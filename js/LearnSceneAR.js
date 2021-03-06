'use strict';

import React, { Component } from 'react';
import {View} from 'react-native';

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
  ViroARTrackingTargets,
  ViroSound
} from 'react-viro';

import imageLoader from './services/imageLoader';
import modelLoader from './services/modelLoader';
import soundLoader from './services/soundLoader';
import characterLoader from './services/characterLoader';

export default class LearnSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR...",
      recognitionSucceeded: undefined,
      showsRecognitionResponse: false,
      currentStroke: 1,
      playCharacterSound: false,
      isScanning: false,
      learnedChars: 0
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
	   // REMEMBER TO BIND EVERY FUNCTION!!
	  this._getImageMarkers = this._getImageMarkers.bind(this);
    this._removeCharacterTagets = this._removeCharacterTagets.bind(this);
    this._registerCharacterTagets = this._registerCharacterTagets.bind(this);
    this._nextStroke = this._nextStroke.bind(this);
    this._getCharacterModel = this._getCharacterModel.bind(this);
    this._characerDetectionSuccess = this._characerDetectionSuccess.bind(this);
    this._characerDetectionFailure = this._characerDetectionFailure.bind(this);
    this._getRecognitionResponse = this._getRecognitionResponse.bind(this);
    this._drawAgain = this._drawAgain.bind(this);
    this._getCharacterSound = this._getCharacterSound.bind(this);
    this._onFinishedScan = this._onFinishedScan.bind(this);
    this._getCharacterId = this._getCharacterId.bind(this);
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

  			<ViroAmbientLight color="#FFFFFF" />
  			<ViroSpotLight innerAngle={5} outerAngle={90} direction={[0,-1,-.2]}
          position={[0, 3, 1]} color="#ffffff" castsShadow={true} />

        {this._getCharacterModel()}
        {this._getImageMarkers()}
        {this._getCharacterSound()}

        <ViroARCamera>
          {this._getRecognitionResponse()}
          <ViroButton
              source={require("../img/scan.png")}
              position={[0, -5, -10]}
              height={1}
              width={1}
              onClick={() => this.setState({isScanning: true})}/>
        </ViroARCamera>

       </ViroARScene>
    );
  }

  _getCharacterSound() {
    if (!this.state.playCharacterSound)
      return

    const language = this.props.language;
    const characterSounds = soundLoader.loadCharacterSoundsForLanguage(language);
    const sound = characterSounds[this._getCharacterId()];
    return (
      <ViroSound source={sound} onFinish={() => this.setState({playCharacterSound: false})}/>
    );
  }

  _getRecognitionResponse() {
    if (this.state.recognitionSucceeded == undefined || this.state.showsRecognitionResponse)
      return

    const responseText = this.state.recognitionSucceeded
      ? "Success!"
      : "Failed.";

    const sound = this.state.recognitionSucceeded
      ? <ViroSound source={require("./res/sounds/success.mp3")} />
      : <ViroSound source={require("./res/sounds/failure.mp3")} />;

    const language = this.props.language;
    var characterSet = characterLoader.loadCharacterSetForLanguage(language);

    return (
      <ViroNode>
        <ViroText position={[0, 1, -6]} text={responseText} width={2} height={2} textAlign="center"
          style={{fontFamily:"Arial", fontSize:35, fontWeight:'bold', color:"#FFFFFF"}}/>
        <ViroButton
            source={require("../img/replay.png")}
            position={[0, 1, -10]}
            height={1}
            width={1}
            onClick={() => this._drawAgain()}/>
        <ViroText position={[0, -1, -6]} text={'learn next character!'}
          width={2} height={2} textAlign="center"
          style={{fontFamily:"Arial", fontSize:35, fontWeight:'bold', color:"#FFFFFF"}}
          onClick={() => this._drawNext() } />
        {sound}
      </ViroNode>
    );
  }

  _drawNext() {
    this.setState({
      text : "Initializing AR...",
      recognitionSucceeded: undefined,
      showsRecognitionResponse: false,
      currentStroke: 1,
      playCharacterSound: false,
      learnedChars: this.state.learnedChars + 1
    });
  }

  _drawAgain() {
    this.setState({
      recognitionSucceeded: undefined,
      showsRecognitionResponse: false
    });
  }

  _characerDetectionSuccess() {
    this.setState({
      recognitionSucceeded: true
    });
  }

  _characerDetectionFailure() {
    this.setState({
      recognitionSucceeded: false
    })
  }

  _getCharacterModel() {
    const language = this.props.language;
    const characterModels = modelLoader.loadCharacterModelsForLanguage(language);
    const currentStroke = this.state.currentStroke;
    return (
      <ViroNode position={[0,-55,-10]} transformBehaviors="billboard" dragType="FixedDistance" onDrag={()=>{}} >
        <ViroButton
            source={require("../img/sound.png")}
            position={[2, 1, -9]}
            height={2}
            width={2}
            onClick={() => this.setState({playCharacterSound: true})}/>
        <Viro3DObject
          source={characterModels[this._getCharacterId()][currentStroke].obj}
          resources={[characterModels[this._getCharacterId()][currentStroke].mtl]}
          type="OBJ"
          position={[-2, 0.0, -9]}
          scale={[0.1, 0.1, 0.1]}
          rotation={[0, 0, -90]}
          onClick={() => this._nextStroke()}
        />
      </ViroNode>
    );
  }

  _getCharacterId() {
    return this.props.characterIds[this.state.learnedChars % this.props.characterIds.length];
  }

  _nextStroke() {
    const language = this.props.language;
    const characterModels = modelLoader.loadCharacterModelsForLanguage(language);
    var maxStrokeCount = characterModels[this._getCharacterId()].numberOfStrokes;
    var currentStroke = this.state.currentStroke;
    if (currentStroke == maxStrokeCount)
      this.setState({currentStroke: 1})
    else
      this.setState({currentStroke: currentStroke + 1})
  }

  _onFinishedScan() {
    if (this.state.recognitionSucceeded)
      this.setState({isScanning: false});
    else
      this.setState({isScanning: false, recognitionSucceeded: false })
  }

  _getImageMarkers() {
    if (!this.state.isScanning)
      return

      const language = this.props.language;
      this._registerCharacterTagets(language, this._getCharacterId());

    setTimeout(this._onFinishedScan, 10000);

    return (
      <View>
        <ViroARImageMarker target={"c1"} onAnchorFound={() => this._characerDetectionSuccess()}>
        </ViroARImageMarker>
        <ViroARImageMarker target={"c2"} onAnchorFound={() => this._characerDetectionSuccess()}>
        </ViroARImageMarker>
        <ViroARImageMarker target={"c3"} onAnchorFound={() => this._characerDetectionSuccess()}>
        </ViroARImageMarker>
        <ViroARImageMarker target={"c4"} onAnchorFound={() => this._characerDetectionSuccess()}>
        </ViroARImageMarker>
        <ViroARImageMarker target={"c5"} onAnchorFound={() => this._characerDetectionSuccess()}>
        </ViroARImageMarker>
      </View>
    )
  }

  _registerCharacterTagets(language, charId) {
    this._removeCharacterTagets();
    var allImages = imageLoader.loadCharacterTrackingImagesForLanguage(language);
    var imagesForChar = allImages[charId];

    ViroARTrackingTargets.createTargets({
      'c1' : {
        source : imagesForChar[charId + '1'],
        orientation : "Up",
        physicalWidth : 0.02, // real world width in meters
        type: 'image'
      },
      'c2' : {
        source : imagesForChar[charId + '2'],
        orientation : "Up",
        physicalWidth : 0.02, // real world width in meters
        type: 'image'
      },
      'c3' : {
        source : imagesForChar[charId + '3'],
        orientation : "Up",
        physicalWidth : 0.02, // real world width in meters
        type: 'image'
      },
      'c4' : {
        source : imagesForChar[charId + '4'],
        orientation : "Up",
        physicalWidth : 0.02, // real world width in meters
        type: 'image'
      },
      'c5' : {
        source : imagesForChar[charId + '5'],
        orientation : "Up",
        physicalWidth : 0.02, // real world width in meters
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

}

module.exports = LearnSceneAR;
