import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
    StyleSheet, View, KeyboardAvoidingView,
    ActivityIndicator, Alert, Image, ScrollView,
    ImageBackground, Text,
} from 'react-native';
import { useDispatch } from 'react-redux';
import Button from '../../../components/UI/Button';
import Input from '../../../components/UI/Input';
import Card from '../../../components/UI/Card';
import * as userActions from '../../../redux/actions/users';

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
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            name: '',
            email: '',
            numberId: '',
            phone: '',
            referidNumber: ''
        },
        inputValidities: {
            name: false,
            email: false,
            numberId: false,
            phone: false,
            referidNumber: false
        },
        formIsValid: false
    });

    useEffect(() => {
        if (error) {
            Alert.alert('¡Oh no, un error ha ocurrido!', error, [{ text: 'Está bien'}]);
        }
    }, [error]);

    const registerHandler = async () => {
        const action = userActions.createUser({
            name: formState.inputValues.name,
            email: formState.inputValues.email,
            numberId: formState.inputValues.numberId,
            phone: formState.inputValues.phone,
            referidNumber: formState.inputValues.referidNumber
        });
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
            <ImageBackground source={require('../../../../assets/fondo.png')} style={styles.mainContainer}>
                <View>
                    <Image
                        style={styles.logo}
                        source={require('../../../../assets/logos/cargame-transportador-naranja-letra-gris.png')}
                    />
                </View>
                <Card style={styles.authContainer}>
                    <View style={styles.scrollViewContainer}>
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
                                id="numberId"
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
                            <Text style={styles.referidNumberInfo}>Te enviaremos un correo para verificar</Text>
                            <Input
                                id="referidNumber"
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
                    </View>
                    <View style={styles.btnActionContainer}>
                        {isLoading
                            ? <ActivityIndicator size='large' color='red' />
                            : <Button
                                title="Siguiente"
                                onPress={registerHandler}
                            />
                        }
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
    scrollViewContainer : {
        height: 450
    },
    referidNumberInfo: {
        paddingTop: 10,
        textAlign: "center",
        fontSize: 12,
        color: "#808081"
    },
    btnActionContainer: {
        marginTop: 40,
        marginBottom: 10
    },

});

export default RegisterForm;