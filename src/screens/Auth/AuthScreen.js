import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
    Text, StyleSheet, View,
    ActivityIndicator, Alert, Image,
    ScrollView,
} from 'react-native';
import { KeyboardAwareView } from 'react-native-keyboard-aware-view';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/UI/Button';
import TextInput from '../../components/UI/Input';
import { AntDesign } from '@expo/vector-icons';
import * as authActions from '../../redux/actions/auth';
import {
    shortBrandOrangeGreyUrl,
    shortMainCargaUrl,
} from '../../constants/Utils';

import { primaryColor } from '../../constants/Colors';

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

const AuthScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [isSignUp, setIsSignUp] = useState(false);
    const dispatch = useDispatch();

    const signUpChecked = useSelector(state => state.auth.isSignUp);
    const userToken = useSelector(state => state.auth.token);

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
        signUpChecked ? setIsSignUp(signUpChecked): '';
    }, []);

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
    return !userToken ? (
        <View style={styles.mainContainer}>
            <View style={styles.logoContainer}>
                <Image
                    style={styles.logo}
                    source={shortBrandOrangeGreyUrl}
                />
            </View>
            <KeyboardAwareView animated={true}>
                    <View style={styles.authContainer}>
                        <View style={styles.scrollViewContainer}>
                            <ScrollView>
                                <TextInput
                                    id="email"
                                    label="Correo electrónico"
                                    keyboardType="email-address"
                                    required
                                    email
                                    leftIcon={
                                        <AntDesign name="user" size={20} color={primaryColor} />
                                    }
                                    autoCapitalize="none"
                                    errorText="¡UPS! Por favor ingresa un correo válido."
                                    onInputChange={inputChangeHandler}
                                    initialValue=""
                                />
                                <TextInput
                                    id="password"
                                    label="Contraseña"
                                    keyboardType="default"
                                    secureTextEntry
                                    required
                                    leftIcon={
                                        <AntDesign name="eyeo" size={20} color={primaryColor} />
                                    }
                                    minLength={6}
                                    autoCapitalize="none"
                                    errorText={
                                        `¡UPS! Por favor ingresa una contraseña válida. Debe contener mínimo 6 carácteres
                                        `
                                    }
                                    onInputChange={inputChangeHandler}
                                    initialValue=""
                                />
                                {isSignUp ? (
                                    <TextInput
                                        id="repeatPassword"
                                        label="Repite tu contraseña"
                                        keyboardType="default"
                                        secureTextEntry
                                        required
                                        leftIcon={
                                            <AntDesign name="eyeo" size={20} color={primaryColor} />
                                        }
                                        minLength={6}
                                        autoCapitalize="none"
                                        errorText={
                                            `¡UPS! Por favor ingresa una contraseña válida. Debe contener mínimo 6 carácteres
                                            `
                                        }
                                        onInputChange={inputChangeHandler}
                                        initialValue=""
                                    />
                                ) : (<View />)}
                            </ScrollView>
                        </View>
                        <View style={styles.forgotPasswordContainer}>
                            <Text style={styles.forgotPassword}>¿Olvidaste tu usuario o contraseña?</Text>
                        </View>
                        <View style={styles.btnActionContainer}>
                            {isLoading ? (
                                <ActivityIndicator size='large' color={primaryColor} />
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
                    </View>
                    <Image
                            style={styles.mainCarga}
                            source={shortMainCargaUrl}
                        />
                </KeyboardAwareView>    
            
        </View>
    ) : props.navigation.navigate('Dashboard');
};

const styles = StyleSheet.create({
    mainContainer: {
        height: '100%',
    },
    logo: {
        width: 150,
        height: 150,
        marginTop: 30,
        marginLeft: 132
    },
    authContainer: {
        paddingLeft: 20,
        paddingRight: 20,
        width: 400,
        height: 500
    },
    forgotPasswordContainer: {
       marginTop: 10
    },
    forgotPassword: {
        textAlign: "right",
        fontFamily: 'Quicksand'
    },
    btnActionContainer: {
        marginTop: 10
    },
    changeTextContainer: {
        marginTop: 10,
        marginBottom: 10,
        fontFamily: 'Quicksand'
    },
    changeText: {
        textAlign: "center",
        color: "#808081"
    }, 
    btnSwitchContainer: {
        marginTop: 5,
        marginBottom: 20
    },
    mainCarga: {
        position: 'relative',
        bottom: 30,
        right: 70
    }
});

export default AuthScreen;