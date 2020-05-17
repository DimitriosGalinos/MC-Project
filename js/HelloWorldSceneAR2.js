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
  ViroImage
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
	// REMEMBER TO BIND EVERY FUNCTION!!
	this._onTappedIcecream = this._onTappedIcecream.bind(this);
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
		
		<ViroNode position={[0,0,-1]} dragType="FixedToWorld" onDrag={()=>{}} >
		  <Viro3DObject
			source={require('./res/emojis_n_shit/emoji_angry.vrx')}
			position={[0, .1, 0]}
			scale={[.2, .2, .2]}
			type="VRX" />
		</ViroNode>

        <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
		
		<ViroAmbientLight color={"#FFFFFF"} />
        <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0,-1,-.2]} position={[0, 3, 1]} color="#ffffff" castsShadow={true} />
		
		<Viro3DObject
        source={require('./res/emojis_n_shit/icecreamman_anim_a.vrx')}
        resources={[require('./res/emojis_n_shit/icecreamman_diffuse.png'),
                    require('./res/emojis_n_shit/icecreamman_normal.png'),
                    require('./res/emojis_n_shit/icecreamman_specular.png')]}
        position={[0, -1, -2]}
        scale={[.5, .5, .5]}
        type="VRX"
        dragType="FixedToWorld" onDrag={()=>{}}
        onClick={this._onTappedIcecream}
        animation={{name:"02", run:this.state.runAnimation, loop:true,}}
		/>
		

		 
		<ViroNode position={[0,0,-1]} dragType="FixedToWorld" onDrag={()=>{}} >
			<ViroImage
				height={0.2}
				width={0.2}
				source={require('./res/emojis_n_shit/icon_close.png')}
			 />
		</ViroNode>
		  
	  </ViroARScene>
    );
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
