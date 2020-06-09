import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
    Text, StyleSheet, View, KeyboardAvoidingView,
    ActivityIndicator, Alert, Image, Platform,
    ImageBackground,
    ScrollView,
} from 'react-native';
import { useDispatch } from 'react-redux';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 
import * as authActions from '../../redux/actions/auth';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const backgroundImage = { uri: "../../../assets/fondo.png" };

const formReducer = (state, action) => {
    if(action.type == FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        }
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        }
    }
    return state;
};

const AuthScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [isSignUp, setIsSignUp] = useState(false);
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: ''
        },
        inputValidities: {
            email: false,
            password: false
        },
        formIsValid: false
    });

    useEffect(() => {
        if (error) {
            Alert.alert('¡Oh no, un error ha ocurrido!', error, [{ text: 'Está bien'}]);
        }
    }, [error]);

    const authHandler = async () => {
        let action;
        let nextPage = '';
        const email = formState.inputValues.email;
        const password = formState.inputValues.password;
        if (isSignUp) {
            action = authActions.signup(
                email,
                password
            );

            nextPage = 'Member';
        } else {
            action = authActions.signin(
                email,
                password
            );

            nextPage = 'Dashboard';
        }
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(action);
            props.navigation.navigate(nextPage);
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity ) => {
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier 
            });
        },
        [dispatchFormState]
    );
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles.screen}
            keyboardVerticalOffset={3}
        >
            <ImageBackground source={require('../../../assets/fondo.png')} style={styles.mainContainer}>
                <View>
                    <Image
                        style={styles.logo}
                        source={require('../../../assets/logos/cargame-transportador-naranja-letra-gris.png')}
                    />
                </View>
                <Card style={styles.authContainer}>
                    <View>
                        <Text style={styles.authInfoText}>
                           ¡Gana dinero y conviertete en socio!
                        </Text>
                    </View>
                    <View style={styles.inputsContainer}>
                        <ScrollView>
                            <Input
                                id="email"
                                label="Correo electrónico"
                                keyboardType="email-address"
                                required
                                email
                                leftIcon={
                                    <MaterialIcons name="email" size={24} color="black" />
                                }
                                autoCapitalize="none"
                                errorText="¡UPS! Por favor ingresa un correo válido."
                                onInputChange={inputChangeHandler}
                                initialValue=""
                                inlineImageLeft='username'
                                inlineImagePadding={2}
                                underlineColorAndroid= 'transparent'
                            />
                            <Input
                                id="password"
                                label="Contraseña"
                                keyboardType="default"
                                secureTextEntry
                                required
                                leftIcon={
                                    <MaterialIcons name="email" size={24} color="black" />
                                }
                                minLength={6}
                                autoCapitalize="none"
                                errorText="¡UPS! Por favor ingresa una contraseña válida."
                                onInputChange={inputChangeHandler}
                                initialValue=""
                            />
                            {isSignUp ? (
                                <Input
                                    id="repeatPassword"
                                    label="Repite tu contraseña"
                                    keyboardType="default"
                                    secureTextEntry
                                    required
                                    leftIcon={
                                        <Entypo name="key" size={24} color="black" />
                                    }
                                    minLength={6}
                                    autoCapitalize="none"
                                    errorText="¡UPS! Por favor ingresa una contraseña válida."
                                    onInputChange={inputChangeHandler}
                                    initialValue=""
                                />
                            ) : (<View />)}
                        </ScrollView>
                    </View>
                    <View style={styles.forgotPasswordContainer}>
                        <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
                    </View>
                    <View style={styles.btnActionContainer}>
                        {isLoading ? (
                            <ActivityIndicator size='large' color='red' />
                        ) : (
                            <Button
                            title={isSignUp ? 'Quiero ser socio' : 'Iniciar sesión'}
                            onPress={authHandler}
                            />
                        )}
                    </View>
                    <View style={styles.changeTextContainer}>
                        <Text style={styles.changeText}>
                            {isSignUp ? '¿Ya tienes una cuenta?' : '¿Todavía no tienes una cuenta?'}
                        </Text>
                    </View>
                    <View style={styles.btnSwitchContainer}>
                        <Button
                            title={`Cambiar a ${isSignUp ? 'iniciar sesión' : 'quiero ser socio'}`}
                            colorOne={'white'}
                            colorTwo={'white'}
                            fontColor={'#1D59A2'}
                            onPress={() => {
                                setIsSignUp(prevState => !prevState);
                                }}
                        />
                    </View>
                    <View>

                    </View>
                </Card>
            </ImageBackground>  
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    logo: {
        width: 120,
        height: 120,
        marginBottom: 10,
    },
    screen: {
        flex: 1
    },
    mainContainer: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    authContainer: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: 10,
        paddingBottom: 5,
        paddingLeft: 40,
        paddingRight: 40,
        width: 350,
    },
    authInfoText: {
        paddingTop: 10,
        textAlign: "center",
        fontSize: 20,
        color: "#808081"
    },
    inputsContainer: {
        height: 240
    },
    forgotPasswordContainer: {
       marginTop: 20
    },
    forgotPassword: {textAlign: "right"},
    btnActionContainer: {
        marginTop: 30
    },
    changeTextContainer: {
        marginTop: 10,
        marginBottom: 10
    },
    changeText: {
        textAlign: "center",
        color: "#808081"
    }, 
    btnSwitchContainer: {
        marginTop: 5,
        marginBottom: 40
    }
});

export default AuthScreen;