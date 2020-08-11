import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import Swiper from 'react-native-swiper';
import { primaryColor, yellowColor } from '../../../constants/Colors';
import { collectionTimeSlot } from '../../../constants/Utils';

import DriverHeader from '../../../components/DriverHeader';
import ShowOffer from './ShowOffer';
import OfferForm from './OfferForm';

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
  }
});

const getcollectionTimeSlot = (collectionTimeSlotItem) =>
  collectionTimeSlot.map((collectionTime) =>
    collectionTime.label === collectionTimeSlotItem ? collectionTime.value : '');

const DriverOffersScreen = (props) => {
  const [offerForm, setofferForm] = useState();
  const offers = useSelector(state => state.activeOffers.offers);
  const userAuth = useSelector(state => state.auth);
  if (!userAuth) {
    props.navigation.navigate('Auth');
  }

  const changeToOfferFormHandler = (offerId) => {
    setofferForm(offerId);
  };

  return (
    <View style={styles.supportContainer}>
      <DriverHeader
        title="Ofertas actuales"
        subtitle="Explora las ofertas en tu zona"
        leftIcon="refresh"
      />
      {!offerForm
        ? <Swiper style={styles.swiperContainer} showsButtons showsPagination={false}>
            {offers.map((offer) => (
              <ShowOffer
                key={offer.offerId}
                offer={offer}
                getcollectionTimeSlot={getcollectionTimeSlot}
                changeToOfferFormHandler={changeToOfferFormHandler}
              />
            ))} 
          </Swiper>
        : (
          <OfferForm
            offerForm={offerForm}
            navigation={props.navigation}
            userId={userAuth.userId}
            changeToOfferFormHandler={changeToOfferFormHandler}
          />
        )}
    </View>
  );
};

export default DriverOffersScreen;
