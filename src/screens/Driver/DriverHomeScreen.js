import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import WelcomeHeader from '../../components/WelcomeHeader';
import { textSecondaryColor } from '../../constants/Colors';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { CATEGORIES_LIST } from '../../constants/Utils';
import { ListItem } from 'react-native-elements';

const DriverHomeScreen = props => {
    return (
        <View style={styles.homeContainer}>
            <WelcomeHeader />
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Servicio seleccionado</Text>
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

export default DriverHomeScreen;