import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
  Text, StyleSheet, View,
  ActivityIndicator, Alert, Image,
  ScrollView, KeyboardAvoidingView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/UI/Button';
import TextInput from '../../components/UI/Input';
import { AntDesign } from '@expo/vector-icons';
import * as authActions from '../../redux/actions/auth';
import {
  shortBrandOrangeGreyUrl,
  shortMainCargaUrl,
} from '../../constants/Utils';

import { primaryColor, textPrimaryColor } from '../../constants/Colors';
import { normalizeLength } from '../../styles/layout';
import { AsyncStorage } from 'react-native';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type == FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    }
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    }
  }
  return state;
};

const AuthScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSelected, setSelection] = useState(false);
  const [isSignUp, setIsSignUp] = useState(useSelector(state => state.auth.isSignUp));
  const dispatch = useDispatch();
  const userToken = useSelector(state => state.auth.token);

  useEffect(() => {
    if (error) {
      Alert.alert('¡Oh no, un error ha ocurrido!', error, [{ text: 'Está bien' }]);
    }
  }, [error]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: ''
    },
    inputValidities: {
      email: false,
      password: false
    },
    formIsValid: false
  });

  const authHandler = () => {
    let action;
    let nextPage = '';
    let passwordError = false;
    const email = formState.inputValues.email;
    const password = formState.inputValues.password;

    if (email && password) {
      if (isSignUp) {
        if (password === formState.inputValues.repeatPassword) {
          action = authActions.signup(
            email,
            password
          );

          nextPage = 'Member';
        } else {
          passwordError = true;
        }
      } else {
        action = authActions.signin(
          email,
          password
        );
        nextPage = 'ServicesList';
      }

      if (passwordError) {
        setError('¡UPS! Las contraseñas no coinciden. Intentalo nuevamente.');
      } else {
        const controller = new AbortController();
        setError('');
        setIsLoading(true);
        try {
          dispatch(action);
          controller.abort();
          props.navigation.navigate(nextPage);
        } catch (err) {
          setError(err.message);
        }
        setIsLoading(false);
        controller.abort();
      }
    } else
      Alert.alert('¡UPS!', 'Por favor complete todos los campos', error, [{ text: 'Intentar nuevamente' }]);
  };

  return !userToken ? (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.mainContainer}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={shortBrandOrangeGreyUrl}
          />
        </View>
        <View style={styles.authContainer}>
          <ScrollView>
            <View style={styles.scrollViewContainer}>
              <TextInput
                id="email"
                label="Correo electrónico"
                keyboardType="email-address"
                required
                email
                leftIcon={
                  <AntDesign name="user" size={20} color={primaryColor} />
                }
                autoCapitalize="none"
                errorText="¡UPS! Por favor ingresa un correo válido."
                onInputChange={inputChangeHandler}
                initialValue=""
              />
              <TextInput
                id="password"
                label="Contraseña"
                keyboardType="default"
                secureTextEntry
                required
                leftIcon={
                  <AntDesign name="eyeo" size={20} color={primaryColor} />
                }
                minLength={6}
                autoCapitalize="none"
                errorText={
                  `¡UPS! Por favor ingresa una contraseña válida. Debe contener mínimo 6 carácteres`
                }
                onInputChange={inputChangeHandler}
                initialValue=""
              />
              {isSignUp ? (
                <View>
                  <TextInput
                    id="repeatPassword"
                    label="Repite tu contraseña"
                    keyboardType="default"
                    secureTextEntry
                    required
                    leftIcon={
                      <AntDesign name="eyeo" size={20} color={primaryColor} />
                    }
                    minLength={6}
                    autoCapitalize="none"
                    errorText={
                      `¡UPS! Por favor ingresa una contraseña válida. Debe contener mínimo 6 carácteres
                              `
                    }
                    onInputChange={inputChangeHandler}
                    initialValue=""
                  />
                </View>
              ) : (<View />)}
            </View>
            <View style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPassword}>¿Olvidaste tu usuario o contraseña?</Text>
            </View>
            <View style={styles.btnActionContainer}>
              {isLoading ? (
                <ActivityIndicator size='large' color={primaryColor} />
              ) : (
                <Button
                  title={isSignUp ? 'Quiero ser socio' : 'Iniciar sesión'}
                  onPress={authHandler}
                />
              )}
            </View>
            <View style={styles.changeTextContainer}>
              <Text style={styles.changeText}>
                {isSignUp ? '¿Ya tienes una cuenta?' : '¿Todavía no tienes una cuenta?'}
              </Text>
            </View>
            <View style={styles.btnSwitchContainer}>
              <Button
                title={`Cambiar a ${isSignUp ? 'iniciar sesión' : 'quiero ser socio'}`}
                colorOne={'white'}
                colorTwo={'white'}
                fontColor={primaryColor}
                onPress={() => setIsSignUp(prevState => !prevState)}
              />
            </View>
          </ScrollView>
        </View>
        <Image
          style={styles.mainCarga}
          source={shortMainCargaUrl}
        />
      </View>
    </KeyboardAvoidingView>
  ) : props.navigation.navigate('Dashboard');
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    minHeight: normalizeLength(300),
  },
  logoContainer: {
    flex: 1,
    marginTop: normalizeLength(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: normalizeLength(150),
    height: normalizeLength(150),
  },
  authContainer: {
    flex: 1,
    paddingLeft: "5%",
    paddingRight: "5%",
    marginTop: normalizeLength(70),
    paddingHorizontal: normalizeLength(20),
    minWidth: normalizeLength(380),
    minHeight: normalizeLength(410)
  },
  checkboxContainer: {
    flex: 1,
    width: '100%'
  },
  checkboxRow1: {
    flexDirection: 'row',
    width: '5%',
    position: 'relative',
    top: 0,
  },
  checkboxRow2: {
    flexDirection: 'row',
    width: '95%',
    position: 'relative',
    top: 0,
  },
  label: {
    fontSize: normalizeLength(10)
  },
  forgotPasswordContainer: {
    marginTop: normalizeLength(0)
  },
  forgotPassword: {
    textAlign: "right",
    color: textPrimaryColor,
    fontFamily: 'Quicksand'
  },
  btnActionContainer: {
    flex: 1,
    marginTop: normalizeLength(6)
  },
  changeTextContainer: {
    marginVertical: normalizeLength(4),
  },
  changeText: {
    color: textPrimaryColor,
    fontSize: normalizeLength(12),
    fontWeight: "700",
    textAlign: 'center'
  },
  btnSwitchContainer: {
    marginTop: normalizeLength(2)
  },
  mainCarga: {
    marginLeft: normalizeLength(-40),
    marginTop: normalizeLength(-10),
  }
});

export default AuthScreen;