import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { primaryColor, yellowColor } from '../../../constants/Colors';
import Button from '../../../components/UI/Button';

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

const ShowOffer = (props) => {
  const offer = props.offer;
  return (
    <View
      testId={`${offer.userId}-${offer.destinationCity}`}
      style={styles.offerContainer}
    >
      <View style={styles.showMessageContainer}>
        <Text style={styles.showMessageText}>Nadie ha ofertado</Text>
      </View>
      <View style={styles.showInfoContainer}>
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
      <View style={styles.buttonContainer}>
        <Button
          title="Ofertar"
          paddingVertical={20}
          onPress={() => props.changeToOfferFormHandler(props.offerId) }
        />
      </View>
    </View>
  );
};

export default ShowOffer;
