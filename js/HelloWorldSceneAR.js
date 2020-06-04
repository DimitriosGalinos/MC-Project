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

const pathToLanguages = './res/languages';

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
    // this._registerCharacterTagets('japanese', 'b');

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
			<ViroSpotLight innerAngle={5} outerAngle={90} direction={[0,-1,-.2]} position={[0, 3, 1]} color="#ffffff" castsShadow={true} />
	
			<ViroNode position={[0,0,-1]} dragType="FixedToWorld" onDrag={()=>{}} >
				<Viro3DObject
					source={require("./res/emojis_n_shit/jap.obj")}
					resources={[require("./res/emojis_n_shit/98809510.obj.mtl")]}
					type="OBJ"
					position={[0.0, 0.0, -10]}
					scale={[0.05, 0.05, 0.05]}
					rotation={[0, -45, -90]}
					onLoadStart={this._onLoadStart}
					onLoadEnd={this._onLoadEnd}
					onError={this._onError} 
				/>
			</ViroNode>
			
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

    ViroARTrackingTargets.createTargets({
      'c1' : {
        source : require('./res/languages/japanese/a/a1.jpg'),
        orientation : "Up",
        physicalWidth : 0.015, // real world width in meters
        type: 'image'
      },
      'c2' : {
        source : require('./res/languages/japanese/a/a2.jpg'),
        orientation : "Up",
        physicalWidth : 0.015, // real world width in meters
        type: 'image'
      },
      'c3' : {
        source : require('./res/languages/japanese/a/a3.jpg'),
        orientation : "Up",
        physicalWidth : 0.015, // real world width in meters
        type: 'image'
      },
      'c4' : {
        source : require('./res/languages/japanese/a/a4.jpg'),
        orientation : "Up",
        physicalWidth : 0.015, // real world width in meters
        type: 'image'
      },
      'c5' : {
        source : require('./res/languages/japanese/a/a5.jpg'),
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
