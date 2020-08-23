import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { primaryColor, accentColor, textAccentColor } from '../../constants/Colors';

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 25,
  },
  whiteBorder: {
    borderRadius: 25,
    borderColor: 'white',
  }
});

const Button = props => {
  return (
    <LinearGradient
      start={{ x: -1, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={[
          props.colorOne ? props.colorOne : primaryColor,
          props.colorTwo ? props.colorTwo : accentColor
      ]}
      style={styles.buttonContainer}
    >
      <Text 
        style={
          {
            textAlign: "center",
            paddingHorizontal: props.paddingHorizontal ? props.paddingHorizontal : 10,
            paddingVertical: props.paddingVertical ? props.paddingVertical : 10,
            borderWidth: props.fontColor ? 2 : 1,
            borderColor: props.fontColor ? props.fontColor : primaryColor,
            borderRadius: 25,
            color: props.fontColor ? props.fontColor : textAccentColor,
            fontFamily: 'Quicksand',
            fontSize: 14,
            fontWeight: '700',
            lineHeight: 18
          }
        }
        onPress={!props.disabled && props.onPress}
      >
        {props.title.toUpperCase()}
      </Text>
    </LinearGradient>
  )
};

export default Button;