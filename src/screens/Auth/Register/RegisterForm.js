import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
    StyleSheet, View, KeyboardAvoidingView,
    ActivityIndicator, Alert, Image, ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import Button from '../../../components/UI/Button';
import Input from '../../../components/UI/Input';
import Card from '../../../components/UI/Card';
import * as authActions from '../../../redux/actions/auth';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

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

const RegisterForm = props => {
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
        if (isSignUp) {
            action = authActions.signup(
                formState.inputValues.email,
                formState.inputValues.password
            );
        } else {
            action = authActions.signin(
                formState.inputValues.email,
                formState.inputValues.password
            );
        }
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(action);
            props.navigation.navigate('Dashboard');
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
            <LinearGradient
                start={{ x: -1, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#1D59A2', '#18A7C9']}
                style={styles.gradient}
            >
                <View>
                    <Image
                        style={styles.logo}
                        source={require('../../../../assets/logos/cargame-transportador-naranja-letra-gris.png')}
                    />
                </View>
                <Card style={styles.authContainer}>
                    <ScrollView>
                        <Input
                            id="name"
                            label="Nombres y apellidos"
                            keyboardType="default"
                            minLength={5}
                            required
                            autoCapitalize="words"
                            errorText="¡UPS! Por favor ingresa tu nombre y apellido correctamente."
                            onInputChange={inputChangeHandler}
                            initialValue=""
                            inlineImageLeft='username'
                            inlineImagePadding={2}
                            underlineColorAndroid= 'transparent'
                        />
                        <Input
                            id="idNumber"
                            label="Cédula de ciudadania"
                            keyboardType="numeric"
                            required
                            minLength={4}
                            maxLength={10}
                            autoCapitalize="none"
                            errorText="¡UPS! Por favor ingresa un número de identificación correcto."
                            onInputChange={inputChangeHandler}
                            initialValue=""
                        />
                        <Input
                            id="phone"
                            label="Celular"
                            keyboardType="numeric"
                            required
                            minLength={10}
                            maxLength={10}
                            autoCapitalize="none"
                            errorText="¡UPS! Por favor ingresa un número de celular correcto."
                            onInputChange={inputChangeHandler}
                            initialValue=""
                        />
                        <Input
                            id="email"
                            label="Correo electrónico"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            errorText="¡UPS! Por favor ingresa un correo válido."
                            onInputChange={inputChangeHandler}
                            initialValue=""
                            inlineImageLeft='username'
                            inlineImagePadding={2}
                            underlineColorAndroid= 'transparent'
                        />
                        <Input
                            id="referid"
                            label="Número de referido"
                            keyboardType="numeric"
                            required
                            minLength={10}
                            maxLength={10}
                            autoCapitalize="none"
                            errorText="¡UPS! Por favor ingresa un número de referido correcto."
                            onInputChange={inputChangeHandler}
                            initialValue=""
                        />
                    </ScrollView>
                    <View style={styles.btnActionContainer}>
                            {isLoading
                                ? <ActivityIndicator size='large' color='red' />
                                : <Button
                                    title="Siguiente"
                                    onPress={authHandler}
                                />
                            }
                        </View>
                </Card>
            </LinearGradient>
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
    gradient: {
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
    btnActionContainer: {
        marginTop: 40,
        marginBottom: 10
    },

});

export default RegisterForm;