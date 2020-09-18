import React, { useReducer, useCallback, useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { primaryColor } from '../../../constants/Colors';
import DriverHeader from '../../../components/DriverHeader';
import { AntDesign } from '@expo/vector-icons';
import TextInput from '../../../components/UI/Input';
import Button from '../../../components/UI/Button';
import { KeyboardAwareView } from 'react-native-keyboard-aware-view';
import { ScrollView } from 'react-native-gesture-handler';

import * as driverActions from '../../../redux/actions/drivers';

const FORM_NUMBER_PHONE_UPDATE = 'FORM_NUMBER_PHONE_UPDATE';

const formReducer = (state, action) => {
    if(action.type == FORM_NUMBER_PHONE_UPDATE) {
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

const EditPhoneNumberScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const dispatch = useDispatch();
    const { username, phone, driverId } = useSelector(state => state.driver.name);
    
    useEffect(() => {
        if (error) {
            Alert.alert('¡Oh no, un error ha ocurrido!', error, [{ text: 'Está bien'}]);
        }
    }, [error]);
    
    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            phoneNumber: '',
        },
        inputValidities: {
            phoneNumber: false,
        },
        formIsValid: false
    });

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity ) => {
            dispatchFormState({
                type: FORM_NUMBER_PHONE_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier 
            });
        },
        [dispatchFormState]
    );

    const changeHandler = async () => {
        let action;
        let passwordError = false;
        const phoneNumber = formState.inputValues.phoneNumber;
        action = driverActions.changePhoneNumber(
            phoneNumber,
            driverId
        );
        if (!passwordError) {
            const controller = new AbortController();
            setError(null);
            setIsLoading(true);
            try {
                await dispatch(action);
                controller.abort();
                props.navigation.navigate('Profile');
            } catch (err) {
                setError(err.message);
            }
            setIsLoading(false);
            controller.abort();
        } else {
            setError('¡UPS! Las contraseñas no coinciden. Intentalo nuevamente.');
        }
        
    };

    const goToProfile = () => props.navigation.navigate('Profile');;

    return (
        <View style={styles.servicesContainer}>
            <DriverHeader
                title={username}
                subtitle="Edita tu número de teléfono"
                leftIcon="user-o"
            />
            <View style={styles.inputContainer}>
                <KeyboardAwareView
                    doNotForceDismissKeyboardWhenLayoutChanges={true}
                    animated={true}
                >
                    <ScrollView>
                        <View style={styles.inputContent}>
                            <TextInput
                                id="phoneNumber"
                                label="Número de teléfono"
                                keyboardType="numeric"
                                required
                                leftAvatar={
                                    <AntDesign name="phone" size={24} color={primaryColor} />
                                }
                                minLength={10}
                                maxLength={10}
                                autoCapitalize="none"
                                errorText="¡UPS! Por favor ingresa un número de celular correcto."
                                onInputChange={inputChangeHandler}
                                initialValue={phone}
                            />
                        </View>
                        {isLoading ? (
                            <ActivityIndicator size='large' color={primaryColor} />
                        ) : (
                            <View>
                                <Button
                                    style={styles.updatedBtn}
                                    title={'Actualizar'}
                                    onPress={changeHandler}
                                />
                                <View style={styles.goBackContainer}>
                                    <Button
                                        style={styles.goBackBtn}
                                        title={'Volver'}
                                        colorOne={'white'}
                                        colorTwo={'white'}
                                        fontColor={'#1D59A2'}
                                        onPress={goToProfile}
                                    />
                                </View>
                            </View>
                        )}
                    </ScrollView>
                </KeyboardAwareView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    servicesContainer: {
        backgroundColor: 'transparent',
        height: '100%'
    },
    nameListContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: '5%'
    },
    inputContainer: {
        width: '100%',
        height: '100%',
        marginTop: '5%',
        paddingHorizontal: '3%'
    },
    inputContent: {
        marginBottom: '5%'
    },
    goBackContainer: {
        marginTop: '5%',
    }
});

export default EditPhoneNumberScreen;