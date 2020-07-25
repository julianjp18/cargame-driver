import React, { useEffect } from 'react';
import { Text, StyleSheet, View, YellowBox } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ListItem } from 'react-native-elements';
import { textSecondaryColor, darkGrey } from '../../constants/Colors';
import { categoristList } from '../../constants/Utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import WelcomeHeader from '../../components/WelcomeHeader';
import { setTypeService } from '../../redux/actions/auth';

import * as userActions from '../../redux/actions/users';
import * as driverNotificationsAction from '../../redux/actions/notifications';

const selectedCategoryItem = (navigation, dispatch, categoryId, routeName) => {
    dispatch(setTypeService(categoryId));
    navigation.navigate({routeName});
};

const DriverDashboardScreen = props => {
    YellowBox.ignoreWarnings(['Setting a timer']);
    const dispatch = useDispatch();
    const userAuth = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(userActions.showUser(userAuth.userId));
    }, []);

    if (!userAuth) {
        props.navigation.navigate('Auth');
    }

    const user = useSelector(state => state.user);
    !user && dispatch(driverNotificationsAction.showDriverNotifications());

    return (
        <View style={styles.servicesContainer}>
            <WelcomeHeader />
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Selecciona el servicio a utilizar</Text>
            </View>
            <View>
                <ScrollView>
                    {
                        categoristList.map((category, i) => (
                            <TouchableOpacity
                                key={i}
                                style={styles.selectedItem}      
                                onPress={
                                    () => selectedCategoryItem(
                                        props.navigation,
                                        dispatch,
                                        category.id,
                                        category.routeName
                                    )}
                                disabled={category.id !== 'truck'}
                            >
                                <ListItem
                                    key={i}
                                    containerStyle={styles.listContainer}
                                    title={category.name}
                                    titleStyle={styles.titleListItem}
                                    leftAvatar={{
                                        source: category.avatar_url,
                                        containerStyle: styles.avatarContainer,
                                        avatarStyle: styles.avatar,
                                        rounded: false,
                                    }}
                                    subtitle={category.subtitle}
                                    subtitleStyle={styles.subtitleListItem}
                                    bottomDivider
                                    disabled={category.id !== 'truck'}
                                    disabledStyle={styles.disabledListContainer}
                                />
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    servicesContainer: {
        backgroundColor: 'transparent',
        height: '100%'
    },
    title: {
        paddingTop: '4%',
        color: textSecondaryColor,
        fontFamily: 'Quicksand',
        fontSize: 18,
        fontWeight: '700',
        lineHeight: 22,
        textAlign: 'center',
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
    disabledListContainer: {
        backgroundColor: '#f3f3f3'
    },
    avatarContainer: {
        height: '100%',
        width: '22%'
    },
    avatar: {
        width: '100%',
        height: '100%'
    }
});

export default DriverDashboardScreen;