import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as Linking from 'expo-linking';
import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Image,
  Text,
} from "react-native";
import {
  accentColor,
  primaryColor,
} from "../../constants/Colors";
import {
  shortCarga,
  shortBrandOrangeGreyUrl,
} from "../../constants/Utils";
import Button from "../../components/UI/Button";
import { normalizeLength } from "../../styles/layout";
import * as authActions from '../../redux/actions/auth';

const SuccessRegisterScreen = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const waitingHandler = async () => {
    props.navigation.navigate("Startup");
    Linking.openURL('https://cargame.com.co');
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(authActions.logout());
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <LinearGradient
      start={{ x: -1, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={[
        props.colorOne ? props.colorOne : primaryColor,
        props.colorTwo ? props.colorTwo : accentColor
      ]}
      style={styles.mainContainer}
    >
      {isLoading ? (
        <ActivityIndicator size="large" color={primaryColor} />
      ) : (
        <View style={styles.supportContainer}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={shortBrandOrangeGreyUrl} />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoText}>
              ¡Por favor ingresa a nuestro sitio web para completar tu registro!
            </Text>
          </View>
          <View style={styles.userButtonContainer}>
            <Button title="Ir al sitio web" fontColor="white" onPress={waitingHandler} />
          </View>
          <View style={styles.userButtonContainer}>
            <Button title="Ir al sitio web" fontColor="white" onPress={() => props.navigation.navigate("Index")} />
          </View>
          <View style={styles.mainCargaContainer}>
            <Image style={styles.mainCarga} source={shortCarga} />
          </View>
        </View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    minHeight: normalizeLength(400),
    minWidth: normalizeLength(300),
  },
  supportContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    height: normalizeLength(250),
    width: normalizeLength(250),
    marginTop: normalizeLength(100),
  },
  infoTextContainer: {
    marginHorizontal: normalizeLength(30),
    marginTop: normalizeLength(20)
  },
  infoText: {
    color: '#FFF',
    fontFamily: 'Quicksand',
    fontSize: normalizeLength(25),
    fontWeight: '700',
    lineHeight: 31,
    textAlign: 'center',
  },
  userButtonContainer: {
    marginTop: normalizeLength(20),
  },
  mainCargaContainer: {
    marginTop: normalizeLength(20)
  }
});

export default SuccessRegisterScreen;
