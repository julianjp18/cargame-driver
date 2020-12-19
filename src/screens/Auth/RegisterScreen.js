import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
  StyleSheet, View, Text,
  ActivityIndicator, Alert, Image, KeyboardAvoidingView
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/UI/Button';
import TextInput from '../../components/UI/Input';
import * as driverActions from '../../redux/actions/drivers';

import { FontAwesome } from '@expo/vector-icons';
import { shortBrandOrangeGreyUrl } from '../../constants/Utils';
import { primaryColor, textPrimaryColor } from '../../constants/Colors';
import { normalizeLength } from '../../styles/layout';

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

const RegisterScreen = props => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const { driverId } = useSelector(state => state.auth);
  
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      name: '',
      numberId: '',
      phone: ''
    },
    inputValidities: {
      name: false,
      numberId: false,
      phone: false
    },
    formIsValid: false
  });

  const registerHandler = () => {
    const action = driverActions.createDriver({
      driverId: driverId,
      name: formState.inputValues.name,
      numberId: formState.inputValues.numberId,
      phone: formState.inputValues.phone,
      referidNumber: formState.inputValues.referidNumber ? formState.inputValues.referidNumber : ''
    });
    setError(null);
    setIsLoading(true);
    try {
      dispatch(action);
      props.navigation.navigate('ServicesList');
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

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

  useEffect(() => {
    if (error) {
      Alert.alert('¡Oh no, un error ha ocurrido!', error, [{ text: 'Está bien' }]);
    }
  }, [error]);

  return (
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
        <Text style={styles.registerInfoText}>¡Te ayudamos a conectar directamente con los clientes!</Text>
        <View style={styles.authContainer}>
              <View style={styles.scrollViewContainer}>
                
                  <TextInput
                    id="name"
                    label="Nombres y apellidos (*)"
                    keyboardType="default"
                    minLength={5}
                    required
                    autoCapitalize="words"
                    errorText="¡UPS! Por favor ingresa tu nombre y apellido correctamente."
                    onInputChange={inputChangeHandler}
                    initialValue=""
                    leftIcon={
                      <FontAwesome name="user" size={20} color={primaryColor} />
                    }
                  />
                  <Text style={styles.referidNumberInfo}>Más tarde deberás verificar tu cédula desde tu perfil</Text>
                  <TextInput
                    id="numberId"
                    label="Cédula de ciudadania (*)"
                    keyboardType="numeric"
                    required
                    minLength={4}
                    maxLength={10}
                    autoCapitalize="none"
                    errorText="¡UPS! Por favor ingresa un número de identificación correcto."
                    onInputChange={inputChangeHandler}
                    initialValue=""
                    leftIcon={
                      <FontAwesome name="id-card-o" size={20} color={primaryColor} />
                    }
                  />
                  <TextInput
                    id="phone"
                    label="Celular (*)"
                    keyboardType="numeric"
                    required
                    minLength={10}
                    maxLength={10}
                    autoCapitalize="none"
                    errorText="¡UPS! Por favor ingresa un número de celular correcto."
                    onInputChange={inputChangeHandler}
                    initialValue=""
                    leftIcon={
                      <FontAwesome name="phone" size={20} color={primaryColor} />
                    }
                  />
                  <TextInput
                    id="referidNumber"
                    label="Número de referido"
                    keyboardType="numeric"
                    minLength={6}
                    maxLength={6}
                    autoCapitalize="none"
                    errorText="¡UPS! Por favor ingresa un número de referido correcto."
                    leftIcon={
                      <FontAwesome name="pencil" size={20} color={primaryColor} />
                    }
                    initialValue=""
                  />
                
              </View>
              <View style={styles.btnActionContainer}>
              {isLoading
                ? <ActivityIndicator size='large' color={primaryColor} />
                : <Button
                  title="Finalizar registro"
                  onPress={registerHandler}
                />
              }
            </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    minHeight: normalizeLength(300),
    flex: 1,
    marginTop: normalizeLength(40)
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: normalizeLength(150),
    height: normalizeLength(150),
  },
  authContainer: {
    paddingHorizontal: normalizeLength(20),
    minWidth: normalizeLength(380),
    minHeight: normalizeLength(450)
  },
  registerInfoText: {
    paddingBottom: normalizeLength(25),
    paddingHorizontal: normalizeLength(20),
    textAlign: 'center',
    fontSize: normalizeLength(18),
    color: textPrimaryColor
  },
  referidNumberInfo: {
    paddingTop: normalizeLength(2),
    textAlign: "center",
    fontSize: normalizeLength(12),
    color: textPrimaryColor
  },
  btnActionContainer: {
    marginTop: normalizeLength(4)
  },
});

export default RegisterScreen;