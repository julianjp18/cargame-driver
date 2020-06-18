import React, { useCallback } from 'react';
import {
    Text, StyleSheet, View, Image,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Button from '../components/UI/Button';
import {
    shortBrandOrangeGreyUrl, shortMainCargaUrl, primaryFont,
} from '../constants/Utils';
import { textPrimaryColor, primaryColor } from '../constants/Colors';
import { setIsSignUp } from '../redux/actions/auth';

const HomeScreen = props => {
    const userToken = useSelector(state => state.auth.token);

    const dispatch = useDispatch();
    return !userToken ? (
        <View style={styles.mainContainer}>
            <View style={styles.logoContainer}>
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
                                dispatch(setIsSignUp());
                                props.navigation.navigate('Auth');
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
                <View style={styles.buttonsContainer}>
                    <Text style={styles.buttons}>
                        {`¿Ya eres miembro? `}
                        <Text
                            style={styles.signIn}
                            onPress={() => {
                                props.navigation.navigate('Auth');
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
    ): props.navigation.navigate('Auth');
};

const styles = StyleSheet.create({
    mainContainer: {
        height: '100%',
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '15%'
    },
    logo: {
        height: 215,
        width: 188
    },
    infoContainer: {
        paddingLeft: '5%',
        paddingRight: '5%',
        width: '100%',
        height: '45%'
    },
    title: {
        marginHorizontal: '20%',
        paddingTop: 0,
        color: textPrimaryColor,
        fontFamily: primaryFont,
        fontSize: 25,
        lineHeight: 30,
        textAlign: 'center',
    },
    subtitle: {
        marginHorizontal: '10%',
        marginTop: '5%',
        marginBottom: '10%',
        color:  textPrimaryColor,
        fontFamily: primaryFont,
        fontSize: 18,
        lineHeight: 22,
        textAlign: 'center',
    },
    buttonsContainer: {
        marginTop: '2%'
    },
    buttons: {
        color: textPrimaryColor,
        fontSize: 14,
        fontWeight: "700",
        lineHeight: 20,
        textAlign: 'center'
    },
    signIn: {
        color: primaryColor
    },
    btnMoreInfo: {
        marginTop: '5%',
    },
    btnsContainer: {
        paddingTop: '1%'
    },
    mainCarga: {
        margin: 0,
        paddingHorizontal: 0,
        marginLeft: '-15%',
    }
});

export default HomeScreen;