import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  YellowBox,
} from 'react-native';
import { useDispatch } from 'react-redux';

import Button from '../components/UI/Button';
import {
  shortBrandOrangeGreyUrl,
  shortMainCargaUrl,
  primaryFont,
} from '../constants/Utils';
import { textPrimaryColor, primaryColor } from '../constants/Colors';
import { setIsSignUp } from '../redux/actions/auth';
import { normalizeLength } from '../styles/layout';

const reDirectToAuth = (navigation) => navigation.navigate('Auth');

const onClickRegister = (dispatch, props) => {
  dispatch(setIsSignUp());
  reDirectToAuth(props.navigation);
};

const styles = StyleSheet.create({
  mainContainer: {
    minHeight: normalizeLength(300),
    marginTop: normalizeLength(200),
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: normalizeLength(20)
  },
  logo: {
    height: normalizeLength(215),
    width: normalizeLength(188)
  },
  infoContainer: {
    paddingHorizontal: normalizeLength(20),
    minWidth: normalizeLength(300),
    minHeight: normalizeLength(50)
  },
  title: {
    marginHorizontal: normalizeLength(50),
    paddingTop: normalizeLength(0),
    color: textPrimaryColor,
    fontFamily: primaryFont,
    fontSize: normalizeLength(23),
    textAlign: 'center',
  },
  subtitle: {
    marginHorizontal: normalizeLength(10),
    marginTop: normalizeLength(10),
    marginBottom: normalizeLength(30),
    color: textPrimaryColor,
    fontFamily: primaryFont,
    fontSize: normalizeLength(17),
    textAlign: 'center',
  },
  buttonsContainer: {
    marginTop: normalizeLength(4)
  },
  buttons: {
    color: textPrimaryColor,
    fontSize: normalizeLength(13),
    fontWeight: "700",
    textAlign: 'center'
  },
  signIn: {
    color: primaryColor
  },
  btnMoreInfo: {
    marginTop: normalizeLength(15),
  },
  btnsContainer: {
    paddingTop: normalizeLength(2)
  },
  mainCarga: {
    margin: 0,
    paddingHorizontal: 0,
    marginLeft: normalizeLength(-50),
  }
});

const HomeScreen = props => {
  YellowBox.ignoreWarnings([
    'Setting a timer',
    "Can't perform a React state update on an unmounted component",
    "Cannot update during an existing state transition (such as within `render`).",
  ]);
  const dispatch = useDispatch();
  return (
    <View style={styles.mainContainer}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={shortBrandOrangeGreyUrl}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>
          Gana dinero y conviertete en socio AQUÍ.
        </Text>
        <Text style={styles.subtitle}>
          Ayudamos a nuestros transportadores a conectar
          directamente con clientes.
        </Text>
        <View style={styles.btnsContainer}>
          <View>
            <Button
              title="Registrate aquí"
              onPress={() => onClickRegister(dispatch, props)}
            />
          </View>
          <View style={styles.btnMoreInfo}>
            <Button
              title="Conoce más"
              colorOne={'white'}
              colorTwo={'white'}
              fontColor={'#1D59A2'}
            />
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <Text style={styles.buttons}>
            {`¿Ya eres miembro? `}
            <Text
              style={styles.signIn}
              onPress={() => reDirectToAuth(props.navigation)}
            >
              Ingresar
            </Text>
          </Text>
        </View>
      </View>
      <Image
        style={styles.mainCarga}
        source={shortMainCargaUrl}
      />
    </View>
  );
};

export default HomeScreen;
