import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ListItem } from 'react-native-elements';
import { textSecondaryColor, darkGrey } from '../../constants/Colors';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import DriverHeader from '../../components/DriverHeader';

const selectedCategoryItem = (navigation, routeName) => {
    navigation.navigate({routeName});
};

const DriverProfileScreen = props => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    console.log('user data', user);
    return (
        <View style={styles.servicesContainer}>
            <DriverHeader
                title="Mi perfil"
                subtitle="Explora tu perfil aquí"
            />
            <View>
                <ScrollView>
                    <ListItem
                        containerStyle={styles.listContainer}
                        title='Cédula de ciudadanía'
                        titleStyle={styles.titleListItem}
                        subtitle={user.numberId}
                        subtitleStyle={styles.subtitleListItem}
                        bottomDivider
                    />
                    <ListItem
                        containerStyle={styles.listContainer}
                        title='Número de telefono'
                        titleStyle={styles.titleListItem}
                        subtitle={user.phone}
                        subtitleStyle={styles.subtitleListItem}
                        bottomDivider
                    />
                    <ListItem
                        containerStyle={styles.listContainer}
                        title='Referido por'
                        titleStyle={styles.titleListItem}
                        subtitle={user.referidNumber}
                        subtitleStyle={styles.subtitleListItem}
                        bottomDivider
                    />
                    <ListItem
                        containerStyle={styles.listContainer}
                        title='País'
                        titleStyle={styles.titleListItem}
                        subtitle='Colombia'
                        subtitleStyle={styles.subtitleListItem}
                        bottomDivider
                    />
                    <ListItem
                        containerStyle={styles.listContainer}
                        title='Mi billetera'
                        titleStyle={styles.titleListItem}
                        subtitleStyle={styles.subtitleListItem}
                        bottomDivider
                    />
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
    avatarContainer: {
        height: '100%',
        width: '22%'
    },
    avatar: {
        width: '100%',
        height: '100%'
    }
});

export default DriverProfileScreen;