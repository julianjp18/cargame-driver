import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { primaryColor, accentColor, textAccentColor } from '../constants/Colors';
import { whiteSquareUrl, shortBrandOrangeGreyUrl } from '../constants/Utils';
import { View, Image, Text, StyleSheet } from 'react-native';
import { normalizeLength } from '../styles/layout';

const WelcomeHeader = props => (
  <LinearGradient
    start={{ x: -1, y: 0 }}
    end={{ x: 1, y: 0 }}
    colors={[
      props.colorOne ? props.colorOne : primaryColor,
      props.colorTwo ? props.colorTwo : accentColor
    ]}
  >
    <View style={styles.row}>
      <View style={styles.col1}>
        <Text style={styles.titleHeader}>Bienvenido</Text>
      </View>
      <View style={styles.col2}>
        <Image
          style={styles.whiteSquare}
          source={whiteSquareUrl}
        />
        <Image
          style={styles.logo}
          source={shortBrandOrangeGreyUrl}
        />
      </View>
    </View>
  </LinearGradient>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    height: normalizeLength(150),
    minWidth: normalizeLength(300),
  },
  col1: {
    width:  normalizeLength(200),
    height: normalizeLength(200)
  },
  titleHeader: {
    minHeight: normalizeLength(30),
    paddingTop: normalizeLength(70),
    paddingLeft: normalizeLength(20),
    textAlignVertical: 'bottom',
    fontFamily: 'Ruda',
    fontSize: normalizeLength(28),
    fontWeight: '700',
    color: textAccentColor
  },
  col2: {
    minWidth:  normalizeLength(100),
    minHeight: normalizeLength(100)
  },
  logo: {
    position: 'absolute',
    left: normalizeLength(48),
    top: normalizeLength(70),
    width: normalizeLength(100),
    height: normalizeLength(100),
  },
  whiteSquare: {
    position: 'absolute',
    top: normalizeLength(52),
    left: normalizeLength(20),
    bottom: 0,
  }
});

export default WelcomeHeader;