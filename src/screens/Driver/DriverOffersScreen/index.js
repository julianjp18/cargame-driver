import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import Swiper from 'react-native-swiper';
import { primaryColor, yellowColor } from '../../../constants/Colors';
import { collectionTimeSlot } from '../../../constants/Utils';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import DriverHeader from '../../../components/DriverHeader';
import ShowOffer from './ShowOffer';
import OfferForm from './OfferForm';

import * as offersActions from '../../../redux/actions/offers';

const styles = StyleSheet.create({
  supportContainer: {
    height: '100%',
  },
  showMessageContainer: {
    backgroundColor: yellowColor,
    padding: '10%',
  },
  showMessageText: {
    color: primaryColor,
    fontFamily: "Ruda",
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 24,
    textAlign: "center",
  },
  showInfoContainer: {
    height: '70%',
    maxHeight: '70%',
    marginHorizontal: '10%',
    backgroundColor: '#eeeeee',
    padding: '5%',
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
  buttonContainer: {
    position: 'relative',
    bottom: '3%',
    marginHorizontal: '10%',
  },
  notFoundContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20%'
  },
  notFoundText: {

  },
});

const CHANGE_TO_FORM = "CHANGE_TO_FORM";
const SUCCESS_OFFER = "SUCCESS_OFFER";

const getcollectionTimeSlot = (collectionTimeSlotItem) =>
  collectionTimeSlot.map((collectionTime) =>
    collectionTime.label === collectionTimeSlotItem ? collectionTime.value : '');

const DriverOffersScreen = (props) => {
  const [offerForm, setofferForm] = useState();
  const [changeView, setChangeView] = useState(false);
  
  let offerState = useSelector(state => state.activeOffers);
  const [offers, setOffers] = useState(offerState.offers);

  const [indexSwiper, setIndex] = useState(offerState.index);
  const userAuth = useSelector(state => state.auth);

  if (!userAuth) {
    dispatch(authActions.logout());
    props.navigation.navigate('Auth');
  }

  const changeToOfferFormHandler = (offerId = null, index = indexSwiper, action) => {
    if (offerId !== null) {
      setofferForm(offerId);
      setIndex(index);
    }
    if (action === CHANGE_TO_FORM) {
      setChangeView(true);
    } else 
      setChangeView(false);
  };

  const refreshOffers = async () => {
    const changeOffers = await offersActions.showActiveOffersAsync();
    setOffers(changeOffers);
    setTimeout(refreshOffer, 20000);
  };

  return (
    <View style={styles.supportContainer}>
      <DriverHeader
        title="Ofertas actuales"
        subtitle="Explora las ofertas en tu zona"
        leftIcon="refresh"
      />
      {!changeView
        ? <Swiper
            style={styles.swiperContainer}
            showsButtons
            showsPagination={false}
            index={indexSwiper}
          >
            {offers.length === 0 ? (
              <View style={styles.notFoundContainer}>
                <MaterialCommunityIcons name="delete-empty-outline" size={90} color={primaryColor} />
                <Text style={styles.notFoundText}>
                  No existen ofertas activas por el momento
                </Text>
              </View>
            ) : offers.map((offer, index) => (
              <ShowOffer
                index={index}
                key={index}
                offer={offer}
                changeToForm={CHANGE_TO_FORM}
                getcollectionTimeSlot={getcollectionTimeSlot}
                changeToOfferFormHandler={changeToOfferFormHandler}
              />
            ))}
          </Swiper>
        : (
          <OfferForm
            index={indexSwiper}
            offerForm={offerForm}
            navigation={props.navigation}
            driverId={userAuth.driverId}
            successOffer={SUCCESS_OFFER}
            changeToOfferFormHandler={changeToOfferFormHandler}
          />
        )}
    </View>
  );
};

export default DriverOffersScreen;
