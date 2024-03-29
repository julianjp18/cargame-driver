import React from "react";
import { StyleSheet, Text, View, Alert, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { getUserInfo } from '../../../utils/helpers';

import * as offersActions from '../../../redux/actions/offers';
import * as authActions from '../../../redux/actions/auth';
import Button from '../../../components/UI/Button';

import DriverHeader from "../../../components/DriverHeader";
import { normalizeLength } from "../../../styles/layout";
import { primaryColor, accentColor, textAccentColor } from "../../../constants/Colors";

const CompleteDescriptionScreen = (props) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const user = state.auth;
  const offer = state.offers.offerSelected;

  getUserInfo().then((data) => {
    if (data) {
      const userInfo = JSON.parse(data);
      if (userInfo.idToken === '') {
        dispatch(authActions.logout());
        props.navigation.navigate('Index');
      }
    } else {
      dispatch(authActions.logout());
      props.navigation.navigate('Index');
    }
  });

  const cancelOfferState = () => {
    dispatch(offersActions.cancelOffer(offer.offerId, offer.notificationId));
    props.navigation.navigate('Notifications');
  };

  const cancelOffer = () => {
    Alert.alert(
      'Cancelar viaje',
      '¿Seguro que deseas cancelar el viaje?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        { text: 'Si, cancelar', onPress: cancelOfferState },
      ],
      { cancelable: false }
    )
  };

  return (
    <View style={styles.servicesContainer}>
      <DriverHeader
        title="Servicios"
        subtitle="Explora tus servicios"
        leftIcon="paper-plane-o"
        isButtonBack
        navigation={props.navigation}
        reDirect="Notifications"
      />
      {user && (
        <View style={styles.mainContainer}>
          <ScrollView>
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionTitle}>Contacta a el usuario para coordinar la carga</Text>
            </View>
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
                  <View style={styles.row}>
                    <View>
                      <AntDesign name="user" size={24} color="white" />
                    </View>
                    <View>
                      <Text style={styles.infoUserText}>
                        {offer.user.name}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.row}>
                    <View>
                      <AntDesign name="phone" size={24} color="white" />
                    </View>
                    <View>
                      <Text style={styles.infoUserText}>
                        {offer.user.phone}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.col2}>
                  <FontAwesome name="user-circle-o" size={34} color="white" />
                </View>
              </View>
            </LinearGradient>
            <View style={styles.showInfoContainer}>
              <ScrollView>
                <View style={styles.showInfoContent}>
                  <Text style={styles.title}>Dirección de recogida:</Text>
                  <Text style={styles.subtitle}>{`${offer.currentAddress} - ${offer.currentCity}`}</Text>
                </View>
                <View style={styles.showInfoContent}>
                  <Text style={styles.title}>Ciudad de destino:</Text>
                  <Text style={styles.subtitle}>{`${offer.destinationAddress} - ${offer.destinationCity}`}</Text>
                </View>
                <View style={styles.showInfoContent}>
                  <Text style={styles.title}>Fecha de recogida:</Text>
                  <Text style={styles.subtitle}>{offer.pickUpDate}</Text>
                </View>
                <View style={styles.showInfoContent}>
                  <Text style={styles.title}>Franja horaria de recogida:</Text>
                  <Text style={styles.subtitle}>
                    {offer.timeZone === 'manana' ? 'Mañana' : 'Noche'}
                  </Text>
                </View>
                <View style={styles.showInfoContent}>
                  <Text style={styles.title}>Nombre y apellido de quien recibe:</Text>
                  <Text style={styles.subtitle}>
                    {offer.contact}
                  </Text>
                </View>
                <View style={styles.showInfoContent}>
                  <Text style={styles.title}>Celular:</Text>
                  <Text style={styles.subtitle}>
                    {offer.phone}
                  </Text>
                </View>
                <View style={styles.showInfoContent}>
                  <Text style={styles.title}>Descripción de la carga:</Text>
                  <Text style={styles.subtitle}>
                    {offer.description}
                  </Text>
                </View>
              </ScrollView>
            </View>
            <View style={styles.totalContainer}>
              <Text style={styles.totalTitle}>¡Recuerda! debes verificar la carga antes de iniciar el viaje.</Text>
            </View>
            <LinearGradient
              start={{ x: -1, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={[
                props.colorOne ? props.colorOne : primaryColor,
                props.colorTwo ? props.colorTwo : accentColor
              ]}
            >
              <View style={styles.totalPriceContainer}>
                <Text style={styles.totalText}>¿Verificaste la carga?</Text>
                <View style={styles.buttonContainer}>
                  <Button
                    title={'Si, iniciar el viaje'}
                    onPress={() => props.navigation.navigate('StartOffer')}
                    colorOne={'white'}
                    colorTwo={'white'}
                    fontColor={primaryColor}
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <Button
                    title={'Cancelar viaje'}
                    onPress={cancelOffer}
                  />
                </View>
              </View>
            </LinearGradient>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  servicesContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    minHeight: normalizeLength(300)
  },
  mainContainer: {
    flex: 1,
    minHeight: normalizeLength(200)
  },
  serviceTitleContainer: {
    backgroundColor: '#E8E8E8',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    marginTop: '2%',
    marginBottom: '4%',
    marginLeft: normalizeLength(20)
  },
  col1: {
    width: normalizeLength(50),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: normalizeLength(50),
  },
  col2: {
    width: normalizeLength(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowTotal: {
    flexDirection: 'row',
    width: '100%',
    marginTop: '2%',
    marginBottom: '4%',
    marginLeft: normalizeLength(1)
  },
  totalText: {
    textAlign: 'center',
    color: textAccentColor,
    fontSize: normalizeLength(20),
    fontWeight: 'bold',
  },
  totalValue: {
    color: textAccentColor,
    fontSize: normalizeLength(20),
    fontWeight: 'bold',
  },
  serviceTitle: {
    color: primaryColor,
    fontFamily: 'Quicksand',
    fontSize: normalizeLength(18),
    fontWeight: '700',
    lineHeight: normalizeLength(20),
    paddingHorizontal: normalizeLength(30),
    paddingVertical: normalizeLength(10)
  },
  servicePrice: {
    color: primaryColor,
    fontFamily: 'Quicksand',
    fontSize: normalizeLength(20),
    fontWeight: '700',
    lineHeight: normalizeLength(20),
    paddingLeft: normalizeLength(50),
    paddingVertical: normalizeLength(10)
  },
  descriptionContainer: {
    backgroundColor: accentColor,
  },
  descriptionTitle: {
    color: textAccentColor,
    fontFamily: 'Quicksand',
    fontSize: normalizeLength(14),
    textAlign: 'center',
    fontWeight: '700',
    paddingVertical: normalizeLength(13),
    paddingHorizontal: normalizeLength(10),
  },
  infoUserText: {
    marginLeft: '5%',
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Ruda',
    fontWeight: '900'
  },
  showInfoContainer: {
    minHeight: normalizeLength(200),
    marginHorizontal: '10%',
    backgroundColor: 'transparent',
    paddingTop: normalizeLength(5),
    paddingBottom: normalizeLength(5),
  },
  showInfoContent: {
    marginTop: '3%',
  },
  title: {
    color: primaryColor,
    fontFamily: "Quicksand",
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 18,
  },
  subtitle: {
    color: '#000000',
  },
  valueDeclaredContainer: {
    backgroundColor: 'rgba(93,188,210,.5)',
    paddingTop: normalizeLength(10)
  },
  valueDeclaredInputContent: {
    paddingHorizontal: normalizeLength(60),
    textAlign: 'right'
  },
  valueDeclaredText: {
    color: primaryColor,
    fontFamily: 'Ruda',
    fontSize: normalizeLength(14),
    fontWeight: '900',
    lineHeight: normalizeLength(15),
    textAlign: 'right',
    paddingLeft: normalizeLength(60),
    paddingRight: normalizeLength(30),
    paddingBottom: normalizeLength(20)
  },
  totalContainer: {
    backgroundColor: '#FED043',
  },
  totalTitle: {
    color: primaryColor,
    fontFamily: 'Quicksand',
    fontSize: normalizeLength(14),
    textAlign: 'center',
    fontWeight: '700',
    paddingVertical: normalizeLength(13),
    paddingHorizontal: normalizeLength(13)
  },
  col1: {
    minWidth: normalizeLength(200),
    alignItems: 'center',
    justifyContent: 'center'
  },
  col2: {
    minWidth: normalizeLength(200),
    alignItems: 'center',
    justifyContent: 'center'
  },
  col1Subtotals: {
    minWidth: normalizeLength(250),
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  subtotalsContainer: {
    paddingVertical: normalizeLength(20),
  },
  rowSubtotals: {
    flexDirection: 'row',
    minWidth: normalizeLength(300),
  },
  col2Subtotals: {
    minWidth: normalizeLength(100),
    alignItems: 'center',
    justifyContent: 'center'
  },
  subtotalsText: {
    color: primaryColor,
    fontFamily: 'Quicksand',
    fontSize: normalizeLength(14),
    fontWeight: '700',
    lineHeight: normalizeLength(18),
    textAlign: 'right'
  },
  subtotalsNumber: {
    color: primaryColor,
    fontFamily: 'Ruda',
    fontSize: normalizeLength(14),
    fontWeight: '700',
    lineHeight: normalizeLength(20),
    textAlign: 'right'
  },
  totalPriceContainer: {
    textAlign: 'center'
  },
  totalPrice: {
    textAlign: 'center',
    color: primaryColor,
    fontFamily: 'Quicksand',
    fontSize: normalizeLength(20),
    fontWeight: '700',
  },
  buttonContainer: {
    marginHorizontal: normalizeLength(20),
    marginVertical: normalizeLength(10),
  },
});

export default CompleteDescriptionScreen;
