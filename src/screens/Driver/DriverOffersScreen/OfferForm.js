import React, { useState, useCallback, useReducer, useEffect, } from 'react';
import { ScrollView, Text, StyleSheet, View, Alert, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { primaryColor, accentColor } from '../../../constants/Colors';
import TextInput from '../../../components/UI/Input';
import Button from '../../../components/UI/Button';

import { returnKeyType } from '../../../styles/layout';

import * as offerActions from '../../../redux/actions/offers';

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: '10%',
    marginTop: '5%'
  },
  currencyInfoContainer: {
    textAlign: 'center'
  },
  currencyInfoText: {
    color: primaryColor,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15
  },
  currencyExtraInfoText: {
    textAlign: 'center',
    marginBottom: '5%'
  },
  bottomContainer: {
    height: '100%',
    paddingHorizontal: '20%',
  },
  infoIntentsText: {
    marginVertical: '10%',
    fontSize: 20,
    color: 'white',
  },
  strikesText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
  },
  buttonContainer: {
    marginVertical: '10%',
  }
});

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

const OfferForm = (props) => {
  const [strikes, setStrikes] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const driverUser = useSelector(state => state.driver);
  const userAuth = useSelector(state => state.auth);

  if (!userAuth) {
    dispatch(authActions.logout());
    props.navigation.navigate('Auth');
  }

  useEffect(() => {
    if (error) {
      Alert.alert('¡ Un error ha ocurrido!', error, [{ text: 'Está bien' }]);
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
      value: '',
    },
    inputValidities: {
      email: false,
    },
    formIsValid: false
  });

  const isMultiple = (x, y) => {
    return Math.round(x / y) / (1 / y) === x;
  }

  const offerHandler = () => {
    const value = formState.inputValues.value;
    if (value && isMultiple(Number.parseInt(value), 5000)) {
      const action = offerActions.realizeOffer(props.offerForm, value, props.driverId, props.index, driverUser);
      const controller = new AbortController();
      setError(null);
      setIsLoading(true);
      try {
        dispatch(action);
        props.changeToOfferFormHandler(props.offerForm, props.index, props.successOffer);
        controller.abort();
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
      controller.abort();

    } else {
      setError('¡ Valor no es multiplo de 5.000');
    }
  };

  return (
    <ScrollView style={styles.offerContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          id="value"
          label="Valor (*)"
          keyboardType="numeric"
          returnKeyType={returnKeyType}
          required
          min={5000}
          max={1000000}
          minLength={5}
          maxLength={10}
          autoCapitalize="none"
          errorText="¡ Por favor ingresa un valor mayor a 5000 y en múltiples de 5000 correctamente."
          onInputChange={inputChangeHandler}
          initialValue=""
        />
      </View>
      <View style={styles.currencyInfoContainer}>
        <Text style={styles.currencyInfoText}>
          {`Valores en pesos Col ($)`}
        </Text>
        <Text style={styles.currencyExtraInfoText}>
          Digita un número mayor a 0 y en múltiples de 5.000.
        </Text>
      </View>
      <LinearGradient
        start={{ x: -1, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={[
          primaryColor,
          accentColor,
        ]}
        style={styles.bottomContainer}
      >
        <View style={styles.infoIntentsContainer}>
          <Text style={styles.infoIntentsText}>
            Tienes dos intentos para mejorar la oferta inicial.
          </Text>
          <Text style={styles.strikesText}>{`Intento: ${strikes}`}</Text>
        </View>
        <View style={styles.buttonContainer}>
          {isLoading ? (
            <ActivityIndicator size='large' color={primaryColor} />
          ) : (
            <Button
              title="Ofertar"
              style={styles.offerButton}
              paddingVertical={20}
              fontColor='white'
              onPress={offerHandler}
            />
          )}
        </View>
        <Button
          title="Volver"
          colorOne={'white'}
          colorTwo={'white'}
          fontColor={primaryColor}
          paddingVertical={20}
          onPress={() => props.changeToOfferFormHandler(null)}
        />
      </LinearGradient>
    </ScrollView>
  );
};

export default OfferForm;
