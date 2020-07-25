import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { primaryColor, yellowColor } from '../../constants/Colors';
import DriverHeader from '../../components/DriverHeader';
import Button from '../../components/UI/Button';
import { ScrollView } from 'react-native-gesture-handler';
import { collectionTimeSlot } from '../../constants/Utils';
import Swiper from 'react-native-swiper'

const getOffers = (offers) => offers.then((allOffers) => {
    allOffers.forEach(offer => {
        if (offer.data().status === "active") {
            newActiveOffers.push(offer.data());
        }
    });
});

const getcollectionTimeSlot = (collectionTimeSlotItem) =>
    collectionTimeSlot.map((collectionTime) =>
        collectionTime.label === collectionTimeSlotItem ? collectionTime.value : '');

const DriverOffersScreen = props => {
    const [activeOffers, setActiveOffers] = useState();
    const offers = useSelector(state => state.activeOffers.offers);

    useEffect(() => {
        if(offers && !activeOffers) {
            if (activeOffers) setActiveOffers();
            setActiveOffers(getOffers(offers));
        }
    }, [offers]);

    !activeOffers && getOffers(offers);

    return (
        <View style={styles.supportContainer}>
            <DriverHeader
                title="Ofertas actuales"
                subtitle="Explora las ofertas en tu zona"
                leftIcon="refresh"
            />
            {activeOffers && <Swiper style={styles.swiperContainer} showsButtons showsPagination={false}>
                {console.log(activeOffers)}
                {activeOffers.map((offer) => (
                    <View
                        testId={`${offer.userId}-${offer.destinationCity}`}
                        style={styles.offerContainer}
                        key={offer.destinationCity}
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
                                        {getcollectionTimeSlot(offer.collectionTimeSlot)}
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
                            <Button title="Ofertar" paddingVertical={20} />
                        </View>
                    </View>
                ))} 
            </Swiper>}
        </View>
    );
};

const styles = StyleSheet.create({
    supportContainer: {
        height: '100%'
    },
    offerContainer: {
    },
    showMessageContainer: {
        backgroundColor: yellowColor,
        padding: '10%'
    },
    showMessageText: {
        color: primaryColor,
        fontFamily: "Ruda",
        fontSize: 20,
        fontWeight: '500',
        lineHeight: 24,
        textAlign: "center"
    },
    showInfoContainer: {
        height: '70%',
        maxHeight: '70%',
        marginHorizontal: '10%',
        backgroundColor: '#eeeeee',
        padding: '5%'
    },
    showInfoContent: {
        marginTop: '3%'
    },
    title: {
        color: primaryColor,
        fontFamily: "Quicksand",
        fontWeight: 'bold',
        fontSize: 14,
        lineHeight: 18,
    },
    subtitle: {
        color: '#000000'
    },
    buttonContainer: {
        position: 'relative',
        bottom: '3%',
        marginHorizontal: '10%'
    }
});

export default DriverOffersScreen;