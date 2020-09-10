import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { primaryColor, yellowColor, successColor, cancelColor, offeredColor } from '../../../constants/Colors';
import Button from '../../../components/UI/Button';
import { currencyFormat } from '../../../constants/Utils';

import * as offersActions from '../../../redux/actions/offers';
import { useDispatch } from 'react-redux';

const styles = StyleSheet.create({
  supportContainer: {
    height: '100%',
  },
  buttonRefreshOffer: {
    display: 'none'
  },
  showMessageContainer: {
    backgroundColor: yellowColor,
    padding: '10%',
  },
  showOfferedMessage: {
    backgroundColor: offeredColor,
  },
  showConfirmMessage: {
    backgroundColor: successColor,
    paddingHorizontal: '6%',
    padding: '10%',
  },
  showCancelMessage: {
    backgroundColor: cancelColor,
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

const ShowOffer = (props) => {
  const dispatch = useDispatch();
  const offer = props.offer;
  const [offerValue, setofferValue] = useState(props.offer.offerValue);
  const [lastOfferValue, setLastOfferValue] = useState(props.offer.offerValue);
  const [changeOfferInfoColor, setChangeOfferInfoColor] = useState(false);

  const refreshOffer = async () => {
    const changeOfferValue = await offersActions.getOfferValueById(props.offer.offerId);
    if(parseInt(changeOfferValue) !== parseInt(lastOfferValue)) {
      setofferValue(changeOfferValue);
      setLastOfferValue(changeOfferValue);
      setChangeOfferInfoColor(true);

      setTimeout(() => {
        setChangeOfferInfoColor(false);
      }, 5000);
    }
    setTimeout(refreshOffer, 10000);
  };

  refreshOffer();

  return (
    <View
      testId={`${offer.driverId}-${offer.destinationCity}`}
      style={styles.offerContainer}
    >
      <View
        style={[
          styles.showMessageContainer,
          offer.response.status === 'OFFERED' && styles.showOfferedMessage,
          offer.response.status === 'OK' && styles.showConfirmMessage,
          changeOfferInfoColor && styles.showCancelMessage,
          offer.response.status === 'CANCEL' && styles.showCancelMessage,
          offer.response.status === 'REJECTED' && styles.showCancelMessage,
        ]}
      >
        <Text style={styles.showMessageText}>
          {` ${offer.response.message} ${
            offer.response.status === 'OFFERED'
            || offer.response.status === 'OK'
              ? currencyFormat(offerValue, 0)
              : ''
            }`}
        </Text>
      </View>
      <View
        style={[
          styles.showInfoContainer,
        ]}
      >
        <ScrollView>
          <View style={styles.showInfoContent}>
            <Text style={styles.title}>Ciudad de Origen:</Text>
            <Text style={styles.subtitle}>{offer.currentCity}</Text>
          </View>
          <View style={styles.showInfoContent}>
            <Text style={styles.title}>Ciudad de Destino:</Text>
            <Text style={styles.subtitle}>{offer.destinationCity}</Text>
          </View>
          <View style={styles.showInfoContent}>
            <Text style={styles.title}>Fecha de recogida:</Text>
            <Text style={styles.subtitle}>{offer.pickupDate}</Text>
          </View>
          <View style={styles.showInfoContent}>
            <Text style={styles.title}>Franja horaria de recogida:</Text>
            <Text style={styles.subtitle}>
              {props.getcollectionTimeSlot(offer.collectionTimeSlot)}
            </Text>
          </View>
          <View style={styles.showInfoContent}>
            <Text style={styles.title}>Descripción:</Text>
            <Text style={styles.subtitle}>
              {offer.description}
            </Text>
          </View>
        </ScrollView>
      </View>
      <View
        style={[
          styles.buttonContainer,
          offer.response.status === 'REJECTED' && styles.disableButtonContainer,
        ]}
      >
        <Button
          title="Ofertar"
          paddingVertical={20}
          disabled={offer.response.status === 'REJECTED'}
          onPress={() => props.changeToOfferFormHandler(offer.offerId, props.index) }
        />
      </View>
    </View>
  );
};

export default ShowOffer;
