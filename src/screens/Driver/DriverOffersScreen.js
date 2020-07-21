import React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import { shortBrandOrangeGreyUrl, shortMainCargaUrl } from '../../constants/Utils';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { primaryColor, accentColor, yellowColor, darkGrey } from '../../constants/Colors';
import DriverHeader from '../../components/DriverHeader';
import Button from '../../components/UI/Button';
import { ScrollView } from 'react-native-gesture-handler';

const DriverOffersScreen = props => {
    return (
        <View style={styles.supportContainer}>
            <DriverHeader
                title="Ofertas actuales"
                subtitle="Explora las ofertas en tu zona"
                leftIcon="refresh"
            />
            <View style={styles.showMessageContainer}>
                <Text style={styles.showMessageText}>Nadie ha ofertado</Text>
            </View>
            <View style={styles.showInfoContainer}>
                <ScrollView>
                    <View style={styles.showInfoContent}>
                        <Text style={styles.title}>Ciudad de Origen:</Text>
                        <Text style={styles.subtitle}>Villavicencio, meta</Text>
                    </View>
                    <View style={styles.showInfoContent}>
                        <Text style={styles.title}>Ciudad de Destino:</Text>
                        <Text style={styles.subtitle}>Villavicencio, meta</Text>
                    </View>
                    <View style={styles.showInfoContent}>
                        <Text style={styles.title}>Fecha de recogida:</Text>
                        <Text style={styles.subtitle}>20/07/2020</Text>
                    </View>
                    <View style={styles.showInfoContent}>
                        <Text style={styles.title}>Franja horaria de recogida:</Text>
                        <Text style={styles.subtitle}>Noche (7:00pm - 10:00pm)</Text>
                    </View>
                    <View style={styles.showInfoContent}>
                        <Text style={styles.title}>Descripción:</Text>
                        <Text style={styles.subtitle}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </Text>
                    </View>
                </ScrollView>
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Ofertar" paddingVertical={20} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
        height: '60%',
        maxHeight: '60%',
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