import React, { useState } from 'react'
import { Modal, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Ionicons } from '@expo/vector-icons';


const SearchPlace = ({ place: initialPlace, placeholder, disabled }) => {

    const [place, setPlace] = useState(initialPlace);
    const [show, setShow] = useState(false);

    const selectPlace = (data, details = null) => {
        if (data) {
            setPlace(data.description);
            setShow(false);
        }
    };

    return (
        <View>
            <TouchableOpacity onPress={() => !disable && this.setState({ show: !show })} style={[styles.field, { backgroundColor: disable ? '#D3D3D3' : '#fdfdf6' }]}>
                <Text style={{ color: (place ? 'purple' : 'gray') }}>{place || `${placeholder}...`}</Text>
            </TouchableOpacity>
            <Modal visible={show} animationType={"slide"} transparent={false} onRequestClose={() => this.setState({ show: false })}>
                <View style={styles.containerTop}>
                    <GooglePlacesAutocomplete
                        placeholder={`${placeholder}...`}
                        minLength={5}
                        styles={styles}
                        returnKeyType='search'
                        listViewDisplayed="false"
                        fetchDetails={true}
                        onPress={selectPlace}
                        currentLocation={false}
                        currentLocationLabel="Ubicación actual"
                        // getDefaultValue={this.props.getDefaultValue}
                        query={{
                            key: "AIzaSyCN3wz6v8apPgkJKVzLnH2SymwRVj55N5A",
                            language: "es"
                        }}
                        debounce={200}
                        renderLeftButton={() => <Ionicons name="ios-arrow-back" color="#007AFF" style={{ alignSelf: 'center', marginLeft: 10, marginRight: 10, textAlign: 'center' }} size={30} onPress={() => this.setState({ show: !show })} />}
                    />
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    containerTop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    field: {
        height: 40,
        margin: 15,
        backgroundColor: '#fdfdf6',
        padding: 10,
        borderRadius: 50,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 15,
        shadowOffset: { width: 1, height: 13 },
        overflow: 'hidden'
    },
    listView: {
        backgroundColor: '#ffffff',
        top: 40
    },
    textInputContainer: {
        borderBottomWidth: 0,
        borderTopWidth: 0,
        top: 40
    },
    textInput: {
        color: '#00539b',
        fontSize: 16,
    },
    description: {
        fontWeight: 'bold',
    }
});
export default GooglePlaceSearch;