import React from 'react';
import {
    Text, StyleSheet, View, Image,
} from 'react-native';
import Button from '../components/UI/Button';
import {
    shortBrandOrangeGreyUrl, shortMainCargaUrl, primaryFont,
} from '../constants/Utils';
import { textPrimaryColor } from '../constants/Colors';

const HomeScreen = props => {
    return (
        <View style={styles.mainContainer}>
            <View>
                <Image
                    style={styles.logo}
                    source={shortBrandOrangeGreyUrl}
                />
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.title}>
                    Gana dinero y conviertete en socio AQUÍ.
                </Text>
                <Text style={styles.subtitle}>
                    Ayudamos a nuestros transportadores a conectar directamente con clientes.
                </Text>
                <View style={styles.btnsContainer}>
                    <View>
                        <Button
                            title="Registrate aquí"
                            onPress={() => {
                                props.navigation.navigate({
                                    routeName: 'Auth',
                                    params: {
                                        action: 'signUp'
                                    }
                                });
                            }}
                        />
                    </View>
                    <View style={styles.btnMoreInfo}>
                        <Button
                            title="Conoce más"
                            colorOne={'white'}
                            colorTwo={'white'}
                            fontColor={'#1D59A2'}
                        />
                    </View>
                </View>
                <View style={styles.signinFormContainer}>
                    <Text style={styles.signinForm}>
                        {`¿Ya eres miembro? `}
                        <Text
                            style={styles.signIn}
                            onPress={() => {
                                props.navigation.navigate({
                                    routeName: 'Auth',
                                    params: {
                                        action: 'signIn'
                                    }
                                });
                            }}
                        >
                            Ingresar
                        </Text>
                    </Text>
                </View>
            </View>
            <Image
                style={styles.mainCarga}
                source={shortMainCargaUrl}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    logo: {
        height: 215,
        width: 188
    },
    screen: {
        flex: 1,
        textAlign: 'center'
    },
    mainContainer: {
        paddingTop: 200,
        paddingBottom: 200,
        justifyContent: 'center',
        alignItems: 'center'
    },
    infoContainer: {
        width: 400,
        textAlign: 'center',
    },
    title: {
        height: 97.38,
        color: textPrimaryColor,
        fontFamily: primaryFont,
        fontSize: 25,
        lineHeight: 30,
        textAlign: "center",
        marginTop: 20,
        marginHorizontal: 70,
        marginBottom: 20
    },
    subtitle: {
        height: 70,
        color:  textPrimaryColor,
        fontFamily: primaryFont,
        fontSize: 18,
        lineHeight: 22,
        textAlign: "center",
        marginHorizontal: 30,
        marginVertical: 30
    },
    signinForm: {
        marginTop: 10,
        color: '#808081',
        fontFamily: 'Quicksand',
        fontSize: 14,
        fontWeight: "700",
        lineHeight: 20,
        textAlign: "center"
    },
    signIn: {
        color: '#18A7C9'
    },
    btnMoreInfo: {
        marginTop: 20,
    },
    btnsContainer: {
        paddingHorizontal: 50,
    },
    mainCarga: {
        margin: "auto",
        paddingHorizontal: 110,
        marginLeft: 40
    }
});

export default HomeScreen;