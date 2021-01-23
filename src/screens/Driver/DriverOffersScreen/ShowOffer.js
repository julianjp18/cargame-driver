import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { primaryColor, yellowColor, successColor, cancelColor, offeredColor } from '../../../constants/Colors';
import Button from '../../../components/UI/Button';
import { offerMessages } from '../../../constants/Utils';
import { currencyFormat } from '../../../utils/helpers';

import * as offersActions from '../../../redux/actions/offers';
import moment from 'moment';
import { normalizeLength } from '../../../styles/layout';

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
    backgroundColor: '#fff',
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
  subtitleTimer: {
    fontSize: normalizeLength(15),
    fontWeight: 'bold',
  },
  buttonContainer: {
    position: 'relative',
    bottom: '3%',
    marginHorizontal: '10%',
  }
});

const ShowOffer = (props) => {
  console.log('props: ', props);
  moment.locale('es');
  const offer = props.offer;
  const [offerValue, setofferValue] = useState(offer.offerValue);
  const [lastOfferValue, setLastOfferValue] = useState(offer.offerValue);
  const [response, setResponse] = useState(offer.response);
  const [changeOfferInfoColor, setChangeOfferInfoColor] = useState(false);
  const [timer, setTimer] = useState();


  const refreshOffer = async () => {
    const { changeOfferValue, dateStarted } = await offersActions.getOfferValueById(offer.offerId);

    if (dateStarted) {
      var now = moment().format("DD/MM/YYYY HH:mm:ss");
      var dur = moment.utc(moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(dateStarted, "DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss")
      setTimer(dur);

      if (dur > "00:04:00") {
        offersActions.changeOfferState(offer.offerId, 'EXPIRED');
      }
    }

    if (changeOfferValue) {
      if (parseInt(changeOfferValue) !== parseInt(lastOfferValue)) {
        setofferValue(changeOfferValue);
        setLastOfferValue(changeOfferValue);
        const { status } = await offersActions.getOfferById(offer.offerId);
        if (status) {
          setResponse({
            status,
            message: offerMessages[status]
          });
        }
        setChangeOfferInfoColor(true);
      }
    }
  };

  useEffect(() => {
    setInterval(() => {
      refreshOffer();
    }, 1000);
  }, []);

  return (
    <View
      testId={`${offer.driverId}-${offer.destinationCity}`}
      style={styles.offerContainer}
    >
      <View
        style={[
          styles.showMessageContainer,
          response.status === 'INFO' && styles.showMessageContainer,
          ['OFFERED', 'IN_PROGRESS'].includes(response.status)
          && styles.showOfferedMessage,
          ['CONTRACTED', 'OK'].includes(response.status)
          && styles.showConfirmMessage,
          response.status === 'CANCEL' && styles.showCancelMessage,
          response.status === 'REJECTED' && styles.showConfirmMessage,
          response.status === 'INFO' && styles.showMessageContainer,
        ]}
      >
        <Text style={styles.showMessageText}>
          {` ${response.message} ${['CONTRACTED', 'OK', 'OFFERED', 'IN_PROGRESS'].includes(response.status)
            ? currencyFormat(offerValue, 0)
            : ''
            }`}
        </Text>
      </View>
      <View style={styles.showInfoContainer}>
        <ScrollView>
          <View style={styles.showInfoContent}>
            <Text style={styles.title}>Tiempo transcurrido:</Text>
            <Text style={styles.subtitleTimer}>{timer}</Text>
          </View>
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
            <Text style={styles.subtitle}>{moment(offer.pickUpDate, 'DD/MM/YYYY').format("ll")}</Text>
          </View>
          <View style={styles.showInfoContent}>
            <Text style={styles.title}>Franja horaria de recogida:</Text>
            <Text style={styles.subtitle}>
              {props.getcollectionTimeSlot(offer.timeZone)}
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
          response.status === 'REJECTED' && styles.disableButtonContainer,
        ]}
      >
        <Button
          title="Ofertar"
          paddingVertical={20}
          disabled={response.status === 'REJECTED'}
          onPress={() => props.changeToOfferFormHandler(offer.offerId, props.index, props.changeToForm)}
        />
      </View>
    </View>
  );
};

export default ShowOffer;
