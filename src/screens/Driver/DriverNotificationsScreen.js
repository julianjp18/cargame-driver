import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ListItem } from 'react-native-elements';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { textSecondaryColor, darkGrey, primaryColor } from '../../constants/Colors';
import DriverHeader from '../../components/DriverHeader';
import { AntDesign } from '@expo/vector-icons';

const DriverNotificationsScreen = () => {
    const [driverNotifications, setDriverNotifications] = useState();
    const notifications = useSelector(state => state.notifications.driverNotifications);
    const user = useSelector(state => state.user);
    useEffect(() => {   
       if (notifications && !driverNotifications) {
            const newDriverNotifications = [];
            notifications.then((allNotifications) => {
                allNotifications.forEach(notification => {
                    if (
                        notification.userId === "0" ||
                        notification.userId === user.userId
                    ) {
                        newDriverNotifications.push(notification.data());
                    }
                });
            })
            setDriverNotifications(newDriverNotifications);
       }
    }, [notifications]);
    
    return (
        <View style={styles.servicesContainer}>
            <DriverHeader
                title="Notificaciones"
                subtitle="Explora tus notificaciones"
                leftIcon="bell-o"
            />
            {user && (
                <ScrollView>
                    <View style={styles.infoContainer}>
                        {driverNotifications && driverNotifications.map((notification) => (
                            <ListItem
                                key={notification['created_at'].seconds}
                                containerStyle={styles.listContainer}
                                bottomDivider
                                leftIcon={
                                    <AntDesign className="" name="bells" size={24} color={primaryColor} />
                                }
                                title={notification.message}
                                titleStyle={styles.titleListItem}
                            />
                        ))}
                        <TouchableOpacity>
                            <ListItem
                                containerStyle={styles.listContainer}
                                bottomDivider
                                leftIcon={
                                    <AntDesign className="" name="bells" size={24} color={primaryColor} />
                                }
                                rightIcon={
                                    <AntDesign name="right" size={24} color={primaryColor} />
                                }
                                title="¡Bienvenido a Cargame! Consulta con Soporte si tienes alguna duda."
                                titleStyle={styles.titleListItem}
                            />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            )}
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
    nameListText: {
        color: darkGrey,
        fontFamily: 'Quicksand',
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 24
    },
    title: {
        paddingTop: '2%',
        color: textSecondaryColor,
        fontFamily: 'Quicksand',
        fontSize: 18,
        fontWeight: '700',
        lineHeight: 22,
        textAlign: 'center',
    },
    titleListItem: {
        color: darkGrey,
        fontFamily: 'Quicksand',
        fontSize: 14,
        lineHeight: 24
    },
    subtitleListItem: {
        color: darkGrey,
        fontFamily: 'Quicksand',
        fontSize: 14,
        lineHeight: 24
    },
    listContainer: {
        backgroundColor: 'transparent',
        paddingBottom: '4%'
    },
    mainCargaContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainCarga: {
        width: '30%',
        height: 100,
    },
});

export default DriverNotificationsScreen;