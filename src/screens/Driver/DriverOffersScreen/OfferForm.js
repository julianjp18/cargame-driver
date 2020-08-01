import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { primaryColor, accentColor } from '../../../constants/Colors';
import TextInput from '../../../components/UI/Input';
import Button from '../../../components/UI/Button';

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

const OfferForm = (props) => {
  const [strikes, setStrikes] = useState(1);
  const offers = props.offers;

  const inputChangeHandler = (e) => {
    console.log(e);
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
          errorText="¡UPS! Por favor ingresa un valor mayor a 0 y en múltiples de 5.000 correctamente."
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
            onPress={() => props.changeToOfferFormHandler(props.offerId) }
          />
        </View>
        <Button
          title="Volver"
          colorOne={'white'}
          colorTwo={'white'}
          fontColor={primaryColor}
          paddingVertical={20}
          onPress={props.navigate}
        />       
      </LinearGradient>
    </View>
  );
};

export default OfferForm;
