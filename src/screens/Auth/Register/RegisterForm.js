import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
    StyleSheet, View,
    ActivityIndicator, Alert, Image, ScrollView,
    Text,
} from 'react-native';
import { KeyboardAwareView } from 'react-native-keyboard-aware-view';
import { useDispatch } from 'react-redux';
import Button from '../../../components/UI/Button';
import TextInput from '../../../components/UI/Input';
import * as userActions from '../../../redux/actions/users';

import { FontAwesome } from '@expo/vector-icons';

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
        <View style={styles.mainContainer}>
            <View>
                <Image
                    style={styles.logo}
                    source={require('../../../../assets/logos/cargame-transportador-naranja-letra-gris.png')}
                />
            </View>
            <Text style={styles.registerInfoText}>¡Te ayudamos a conectar directamente con los clientes!</Text>
            <KeyboardAwareView animated={true}>
                <View style={styles.authContainer}>
                    <View style={styles.scrollViewContainer}>
                        <ScrollView>
                            <TextInput
                                id="name"
                                label="Nombres y apellidos"
                                keyboardType="default"
                                minLength={5}
                                required
                                autoCapitalize="words"
                                errorText="¡UPS! Por favor ingresa tu nombre y apellido correctamente."
                                onInputChange={inputChangeHandler}
                                initialValue=""
                                leftIcon={
                                    <FontAwesome name="user" size={20} color="black" />
                                }
                            />
                            <Text style={styles.referidNumberInfo}>Más tarde deberás verificar tu cédula desde tu perfil</Text>
                            <TextInput
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
                                leftIcon={
                                    <FontAwesome name="id-card-o" size={20} color="black" />
                                }
                            />
                            <TextInput
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
                                leftIcon={
                                    <FontAwesome name="phone" size={20} color="black" />
                                }
                            />
                            <TextInput
                                id="referidNumber"
                                label="Número de referido"
                                keyboardType="numeric"
                                required
                                minLength={10}
                                maxLength={10}
                                autoCapitalize="none"
                                errorText="¡UPS! Por favor ingresa un número de referido correcto."
                                onInputChange={inputChangeHandler}
                                leftIcon={
                                    <FontAwesome name="pencil" size={20} color="#1D59A2" />
                                }
                                initialValue=""
                            />
                        </ScrollView>
                    </View>
                    <View style={styles.btnActionContainer}>
                        {isLoading
                            ? <ActivityIndicator size='large' color='#1D59A2' />
                            : <Button
                                title="Finalizar registro"
                                onPress={registerHandler}
                            />
                        }
                    </View>
                </View>
            </KeyboardAwareView>
        </View>
    );
};

const styles = StyleSheet.create({
    logo: {
        width: 150,
        height: 150,
        marginTop: 30,
    },
    mainContainer: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    authContainer: {
        paddingLeft: 20,
        paddingRight: 20,
        width: 390
    },
    registerInfoText: {
        paddingBottom: 40,
        paddingHorizontal: 30,
        textAlign: "center",
        fontSize: 20,
        color: "#808081"
    },
    referidNumberInfo: {
        paddingTop: 10,
        textAlign: "center",
        fontSize: 12,
        color: "#808081"
    },
    btnActionContainer: {
        marginTop: 10,
        marginBottom: 20
    },

});

export default RegisterForm;