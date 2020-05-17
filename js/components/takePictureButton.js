import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

const TakePictureButton = (props) => {
   return (
     <TouchableOpacity style={styles.TakePictureButton} onPress={props.onPress}>
     </TouchableOpacity>
   );
};

const styles = StyleSheet.create({
  TakePictureButton: {
    alignSelf: 'center',
    alignItems: 'center',
    bottom: -275,
    left: 125,
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 50
  }
});

export default TakePictureButton
