import React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import { ListItem } from 'react-native-elements'
import { textAccentColor, primaryColor, accentColor, textSecondaryColor } from '../../constants/Colors';
import { whiteSquareUrl, shortBrandOrangeGreyUrl, truckSquareUrl, carSquareUrl, motocycleSquareUrl, craneSquareUrl, busSquareUrl, planeSquareUrl } from '../../constants/Utils';
import { LinearGradient } from 'expo-linear-gradient';

const CATEGORIES_LIST = [
    {
      name: 'Camión',
      avatar_url: truckSquareUrl,
      subtitle: 'Lleva documentos y paquetes',
      routeName: 'Truck', 
    },
    {
      name: 'Carro particular',
      avatar_url: carSquareUrl,
      subtitle: 'Lleva documentos, paquetes y personas'
    },
    {
        name: 'Moto',
        avatar_url: motocycleSquareUrl,
        subtitle: 'Lleva documentos y paquetes'
    },
    {
        name: 'Grúa',
        avatar_url: craneSquareUrl,
        subtitle: 'Solicita un servicio'
    },
    {
        name: 'Viajero en Bus',
        avatar_url: busSquareUrl,
        subtitle: 'Lleva documentos y paquetes'
    },
    {
        name: 'Viajero en Avión',
        avatar_url: planeSquareUrl,
        subtitle: 'Lleva documentos'
    },
];

const DriverDashboardScreen = props => {

    return (
        <View style={styles.servicesContainer}>
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
                        <Text style={styles.titleHeader}>Bienvenido</Text>
                    </View>
                    <View style={styles.col2}>
                        <Image
                            style={styles.whiteSquare}
                            source={whiteSquareUrl}
                        />
                        <Image
                            style={styles.logo}
                            source={shortBrandOrangeGreyUrl}
                        />
                    </View>
                </View>
            </LinearGradient>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Selecciona el servicio a utilizar</Text>
            </View>
            {
                CATEGORIES_LIST.map((category, i) => (
                <ListItem
                    key={i}
                    containerStyle={styles.listContainer}
                    title={category.name}
                    leftAvatar={{
                        source: category.avatar_url,
                        containerStyle: styles.avatarContainer,
                        avatarStyle: styles.avatar,
                        rounded: false,
                    }}
                    subtitle={category.subtitle}
                    bottomDivider
                    onPress={() => {
                        props.navigation.navigate({routeName: category.routeName});
                    }}
                />
                ))
            }
        </View>
    );
};

const styles = StyleSheet.create({
    servicesContainer: {
        backgroundColor: 'transparent',
        height: '100%'
    },
    row: {
        flexDirection: 'row',
        height: 156,
        width: 414,
    },
    col1: {
        width: '50%'
    },
    titleHeader: {
        height: '100%',
        textAlignVertical: 'bottom',
        paddingLeft: 20,
        paddingBottom: 40,
        fontFamily: 'Ruda',
        fontSize: 28,
        fontWeight: '700',
        color: textAccentColor,
        lineHeight: 24
    },
    col2: {
        width: '50%',
    },
    logo: {
        position: 'absolute',
        right: 10,
        top: 70,
        width: 100,
        height: 100,
    },
    whiteSquare: {
        position: 'absolute',
        right: 0,
        bottom: 0,
    },
    title: {
        paddingTop: 30,
        paddingBottom: 5,
        color: textSecondaryColor,
        fontFamily: 'Quicksand',
        fontSize: 18,
        fontWeight: '700',
        lineHeight: 22,
        textAlign: 'center',
    },
    listContainer: {
        backgroundColor: 'transparent'
    },
    avatarContainer: {
        height: 70,
        width: 70,
    },
    avatar: {
        width: 80
    }
});

export default DriverDashboardScreen;