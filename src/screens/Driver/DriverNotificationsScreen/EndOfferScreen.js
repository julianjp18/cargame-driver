import React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { shortBrandOrangeGreyUrl, shortMainCargaUrl } from '../../../constants/Utils';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { primaryColor, accentColor, textAccentColor } from '../../../constants/Colors';
import Button from '../../../components/UI/Button';

import * as authActions from '../../../redux/actions/auth';
import { getUserInfo } from '../../../utils/helpers';
import { normalizeLength } from '../../../styles/layout';

const EndOfferScreen = props => {
  const dispatch = useDispatch();

  getUserInfo().then((data) => {
    const userInfo = JSON.parse(data);
    if (!userInfo.idToken) {
      dispatch(authActions.logout());
      props.navigation.navigate('Index');
    }
  });

  return (
    <View style={styles.supportContainer}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={shortBrandOrangeGreyUrl}
        />
      </View>
      <View style={styles.mainCargaContainer}>
        <View style={styles.row1}>
          <View style={styles.row1Col1}>
            <AntDesign
              style={styles.supportIcon}
              name="flag"
              size={60}
              color={primaryColor}
            />
          </View>
          <View style={styles.row1Col2}>
            <Text style={styles.infoText}>¡HAZ FINALIZADO EL VIAJE!</Text>
          </View>
        </View>
      </View >
      <LinearGradient
        start={{ x: -1, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={[
          props.colorOne ? props.colorOne : primaryColor,
          props.colorTwo ? props.colorTwo : accentColor
        ]}
      >
        <View style={styles.linearGradientContainer}>
          <Text style={{ ...styles.linearGradientText, ...styles.linearGradientTextTitle }}>¡Recuerda!</Text>
          <Text style={styles.linearGradientText}>Puedes verificar tus ingresos en tu perfil</Text>
        </View>
      </LinearGradient>
      <View style={styles.row}>
        <View style={styles.col1}>
          <Button
            title="Ir a mi perfil"
            colorOne={'white'}
            colorTwo={'white'}
            fontColor={primaryColor}
            onPress={() => props.navigation.navigate('Profile')}
          />
        </View>
        <View style={styles.col2}>
          <Button
            title="Buscar viajes"
            onPress={() => props.navigation.navigate('Travels')}
          />
        </View>
      </View>
    </View >
  );
};

const styles = StyleSheet.create({
  supportContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    minHeight: normalizeLength(300)
  },
  logoContainer: {
    alignItems: 'center',
    minHeight: normalizeLength(100),
    minWidth: normalizeLength(150),
    paddingTop: normalizeLength(40)
  },
  logo: {
    height: normalizeLength(150),
    width: normalizeLength(150),
  },
  mainCargaContainer: {
    flex: 1,
    paddingTop: normalizeLength(50)
  },
  linearGradientContainer: {
    paddingTop: normalizeLength(30),
    paddingHorizontal: normalizeLength(50),
    paddingBottom: normalizeLength(30),
  },
  linearGradientTextTitle: {
    fontWeight: 'bold',
  },
  linearGradientText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: normalizeLength(15)
  },
  row1: {
    flexDirection: 'row',
    width: '100%',
    position: 'relative',
    top: 0,
  },
  row1Col1: {
    width: '40%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: normalizeLength(20)
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    marginTop: normalizeLength(40),
    marginBottom: normalizeLength(30)
  },
  col1: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  col2: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  supportIcon: {
    opacity: 1
  },
  row1Col2: {
    width: '60%',
    paddingRight: normalizeLength(10)
  },
  infoText: {
    paddingTop: normalizeLength(5),
    color: primaryColor,
    fontFamily: 'Ruda',
    fontSize: normalizeLength(30),
    fontWeight: 'bold',
    paddingBottom: normalizeLength(20)
  },
  extraInfo: {
    paddingHorizontal: normalizeLength(5),
    paddingTop: normalizeLength(15)
  },
  extraInfoText: {
    color: textAccentColor,
    fontFamily: 'Quicksand',
    fontSize: normalizeLength(15),
    lineHeight: normalizeLength(15),
    paddingHorizontal: normalizeLength(20)
  },
  row2: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: normalizeLength(5),
    paddingBottom: normalizeLength(10)
  },
});

export default EndOfferScreen;