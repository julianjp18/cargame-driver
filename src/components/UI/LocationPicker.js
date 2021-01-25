import React from 'react';
import { View, StyleSheet } from 'react-native';

import TextInput from './Input';

import { TouchableOpacity } from 'react-native-gesture-handler';

const LocationPicker = props => {
    const handleEvent = () => {
        props.navigation.navigate(
            'Map',
            {
                handleEvent: props.handleEvent,
                label: props.label,
                data: {
                    location: props.location,
                    address: props.value
                }
            }
        );
    };

    return (
        <View style={styles.locationContainer}>
            <TouchableOpacity onPress={handleEvent}>
                <TextInput
                    label={props.label}
                    value={props.value}
                    keyboardType="default"
                    required
                    autoCapitalize="sentences"
                    errorText={props.errorText}
                    initialValue={props.initialValue}
                    editable={false}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    locationContainer: {
        marginBottom: 15,
    },
    mapPreviewContainer: {
        width: '100%',
        height: 150,
        marginBottom: 10,
        borderColor: "#fff",
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default LocationPicker;