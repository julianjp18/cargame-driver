import React, { useState, useCallback, useReducer } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { primaryColor, accentColor } from '../../../constants/Colors';
import TextInput from '../../../components/UI/Input';
import Button from '../../../components/UI/Button';
import { useDispatch } from 'react-redux';

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
    if(action.type == FORM_INPUT_UPDATE) {
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
  
  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity ) => {
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

  console.log(props.offerForm);

  const isMultiple = (x) => {
    const y = 5000;
    return x % y == 0;
  }

  const offerHandler = async () => {
    const value = formState.inputValues.value;
    console.log(value, isMultiple(value));
    if(value) {
      const action = offerActions.realizeOffer(props.offerForm);
      const controller = new AbortController();
      setError(null);
      setIsLoading(true);
      try {
          await dispatch(action);
          controller.abort();
          props.changeToOfferFormHandler(props.offerForm);
      } catch (err) {
          setError(err.message);
      }
      setIsLoading(false);
      controller.abort();
    } else {
      setError('¡UPS! por favor ingresa un valor correcto.');
    }
    
  };

  return (
    <View style={styles.offerContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          id="value"
          label="Valor (*)"
          keyboardType="numeric"
          required
          min={5000}
          max={1000000}
          minLength={5}
          maxLength={10}
          autoCapitalize="none"
          errorText="¡UPS! Por favor ingresa un valor mayor a 5000 y en múltiples de 5000 correctamente."
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
          <Button
            title="Ofertar"
            style={styles.offerButton}
            paddingVertical={20}
            fontColor='white'
            onPress={offerHandler}
          />
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
    </View>
  );
};

export default OfferForm;
