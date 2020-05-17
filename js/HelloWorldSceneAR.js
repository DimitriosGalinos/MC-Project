'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

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
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR..."
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
		<ViroARPlaneSelector />
		<ViroNode position={[0,0,-1]} dragType="FixedToWorld" onDrag={()=>{}} >
		  <Viro3DObject
			source={require('./res/emojis_n_shit/emoji_smile.vrx')}
			position={[0, .1, 0]}
			rotation={[0, -90, 0]}
			scale={[.2, .2, .2]}
			type="VRX" />
		</ViroNode>

        <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
		<ViroAmbientLight color="#FFFFFF" />
        <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0,-1,-.2]} position={[0, 3, 1]} color="#ffffff" castsShadow={true} />
		
		<ViroNode position={[0,0,-1]} dragType="FixedToWorld" onDrag={()=>{}} >
			<Viro3DObject
				source={require("./res/emojis_n_shit/13041_Beagle_v1_L1.obj")}
				resources={[require('./res/emojis_n_shit/13041_Beagle_diffuse.jpg'),
							require("./res/emojis_n_shit/13041_Beagle_v1_L1.mtl")]}
				highAccuracyEvents={true}
				position={[0, .1, 0]}
				scale={[0.01, 0.01, 0.01]}
				rotation={[45, 45, 45]}
				type="OBJ"
				transformBehaviors={["billboard"]}/>
		</ViroNode>

		
	  </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : "Hello World!"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

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
