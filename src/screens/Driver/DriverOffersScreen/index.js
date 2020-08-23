import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Swiper from 'react-native-swiper';
import { primaryColor, yellowColor } from '../../../constants/Colors';
import { collectionTimeSlot } from '../../../constants/Utils';

import * as offersAction from '../../../redux/actions/offers';

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
  let offerState = useSelector(state => state.activeOffers);
  let offers = offerState.offers;

  const [indexSwiper, setIndex] = useState(offerState.index);
  const userAuth = useSelector(state => state.auth);
  if (!userAuth) {
    dispatch(authActions.logout());
    props.navigation.navigate('Auth');
  }

  const changeToOfferFormHandler = (offerId = null, index = indexSwiper) => {
    setofferForm(offerId);
    setIndex(index);
  };

  return (
    <View style={styles.supportContainer}>
      <DriverHeader
        title="Ofertas actuales"
        subtitle="Explora las ofertas en tu zona"
        leftIcon="refresh"
      />
      {!offerForm
        ? <Swiper
            style={styles.swiperContainer}
            showsButtons
            showsPagination={false}
            index={indexSwiper}
          >
            {offers.map((offer, index) => (
              <ShowOffer
                index={index}
                key={index}
                offer={offer}
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
            userId={userAuth.userId}
            changeToOfferFormHandler={changeToOfferFormHandler}
          />
        )}
    </View>
  );
};

export default DriverOffersScreen;
