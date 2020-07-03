import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import WelcomeHeader from '../../components/WelcomeHeader';
import { textSecondaryColor, darkGrey, primaryColor } from '../../constants/Colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ScrollView } from 'react-native-gesture-handler';
import { CATEGORIES_LIST } from '../../constants/Utils';
import { ListItem } from 'react-native-elements';
import moment from 'moment';
import TextInput from '../../components/UI/Input';
import Button from '../../components/UI/Button';

const DriverHomeScreen = props => {
    moment.locale(); 
    const URBAN_SERVICE = 1;
    const RURAL_SERVICE = 0;
    const typeServiceId = useSelector(state => state.auth.typeServiceSelected);
    const categorySelected = CATEGORIES_LIST.find(category => category.id === typeServiceId);
    const [typeTruckService, setTypeTruckService] = useState(RURAL_SERVICE);
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    
    const changeTypeTruckService = (changeType) => {
        setTypeTruckService(changeType);
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showDatePickerModal = () => {
        setShow(!show);
    };

    return (
        typeServiceId ? (
            <View style={styles.homeContainer}>
                <WelcomeHeader />
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Servicio seleccionado</Text>
                </View>
                <View>
                    <ScrollView>
                        <ListItem
                            containerStyle={styles.listContainer}
                            title={categorySelected.name}
                            titleStyle={styles.titleListItem}
                            leftAvatar={{
                                source: categorySelected.avatar_url,
                                containerStyle: styles.avatarContainer,
                                avatarStyle: styles.avatar,
                                rounded: false,
                            }}
                            subtitleStyle={styles.subtitleListItem}
                            subtitle={categorySelected.subtitle}
                            bottomDivider
                        />
                        <View style={styles.row}>
                            <View style={styles.col1}>
                                <Text
                                    style={[
                                        styles.serviceTitle,
                                        typeTruckService === RURAL_SERVICE
                                            ? styles.serviceTitleSelected
                                            : ''
                                    ]}
                                    onPress={() => changeTypeTruckService(RURAL_SERVICE)}
                                >
                                    Servicio intermunicipial
                                </Text>
                            </View>
                            <View style={styles.col2}>
                                <Text
                                    style={[
                                        styles.serviceTitle,
                                        typeTruckService === URBAN_SERVICE
                                            ? styles.serviceTitleSelected
                                            : ''
                                    ]}
                                    onPress={() => changeTypeTruckService(URBAN_SERVICE)}
                                >
                                    Servicio Urbano
                                </Text>
                            </View>
                        </View>
                        <View style={styles.infoContainer}>
                            {typeTruckService == 0 ? (
                                <View>
                                    <TextInput
                                        id="origin"
                                        label="Ciudad de Origen"
                                        keyboardType="default"
                                        required
                                        autoCapitalize="sentences"
                                        errorText="¡UPS! Por favor ingresa una dirección válida."
                                        initialValue=""
                                    />
                                    <TextInput
                                        id="origin"
                                        label="Ciudad de Destino"
                                        keyboardType="default"
                                        required
                                        autoCapitalize="sentences"
                                        errorText="¡UPS! Por favor ingresa una dirección válida."
                                        initialValue=""
                                    />
                                    <Text
                                        style={styles.dateTravelTitle}
                                    >
                                        Fecha de inicio de viaje
                                    </Text>
                                    <Text
                                        onPress={showDatePickerModal}
                                        style={styles.dateTravelContent}
                                    >
                                        {moment(date).format('ll')}
                                    </Text>
                                    {show && (
                                        <DateTimePicker
                                            testID="date-travel"
                                            value={date}
                                            mode={mode}
                                            is24Hour={true}
                                            display="default"
                                            onChange={onChange}
                                        />
                                    )}
                                </View>
                            ): (
                                <View>
                                    <TextInput
                                        id="origin"
                                        label="Ciudad de Activación"
                                        keyboardType="default"
                                        required
                                        autoCapitalize="sentences"
                                        errorText="¡UPS! Por favor ingresa una dirección válida."
                                        initialValue=""
                                    />
                                </View>
                            )}
                            <Button
                                title={`Activarme`}
                            />
                        </View>
                    </ScrollView>
                </View>
            </View>
        ) : (
            <View>
                <Text>Error</Text>
            </View>
        )
    );
};

const styles = StyleSheet.create({
    homeContainer: {
        backgroundColor: 'transparent',
        height: '100%'
    },
    title: {
        paddingTop: '4%',
        paddingLeft: '15%',
        color: textSecondaryColor,
        fontFamily: 'Quicksand',
        fontSize: 18,
        fontWeight: '700',
        lineHeight: 22,
        textAlign: 'left',
    },
    titleListItem: {
        color: darkGrey,
        fontFamily: 'Ruda',
        fontSize: 20,
        fontWeight: '500',
    },
    subtitleListItem: {
        color: darkGrey,
        fontFamily: 'Ruda',
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 20
    },
    listContainer: {
        backgroundColor: 'transparent',
        paddingBottom: '10%'
    },
    avatarContainer: {
        height: '100%',
        width: '22%'
    },
    avatar: {
        width: '100%',
        height: '100%'
    },
    row: {
        flexDirection: 'row',
        width: '100%',
        marginTop: '2%'
    },
    col1: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    col2: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    serviceTitle: {
        color: darkGrey,
        fontFamily: 'Quicksand',
        fontSize: 15,
        fontWeight: '500',
        paddingBottom: '2%'
    },
    serviceTitleSelected: {
        color: primaryColor,
        fontWeight: '700',
        borderBottomWidth: 1,
        borderBottomColor: primaryColor,
    },
    infoContainer: {
        padding: '5%'
    },
    dateTravelTitle: {
        color: primaryColor,
        fontWeight: 'bold'
    },
    dateTravelContent: {
        textAlign: 'center',
        paddingVertical: '3%',
        marginTop: '1%',
        marginBottom: '15%',
        borderColor: primaryColor,
        borderWidth: 1,
        borderRadius: 15
    }
});

export default DriverHomeScreen;