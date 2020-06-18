import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { ListItem } from 'react-native-elements'
import { textSecondaryColor } from '../../constants/Colors';
import { CATEGORIES_LIST } from '../../constants/Utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import WelcomeHeader from '../../components/WelcomeHeader';

const DriverDashboardScreen = props => {

    return (
        <View style={styles.servicesContainer}>
            <WelcomeHeader />
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Selecciona el servicio a utilizar</Text>
            </View>
            <View>
                <ScrollView>
                    {
                        CATEGORIES_LIST.map((category, i) => (
                            <TouchableOpacity
                                style={styles.selectedItem}      
                                onPress={() => {
                                    props.navigation.navigate({routeName: category.routeName});
                                }}
                            >
                                <ListItem
                                    key={i}
                                    containerStyle={styles.listContainer}
                                    title={category.name}
                                    leftAvatar={{
                                        source: category.avatar_url,
                                        containerStyle: styles.avatarContainer,
                                        avatarStyle: styles.avatar,
                                        rounded: false,
                                    }}
                                    subtitle={category.subtitle}
                                    bottomDivider
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
    selectedItem:{
        
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

export default DriverDashboardScreen;