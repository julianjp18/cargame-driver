import React from 'react';
import { Text, StyleSheet, Button, View } from 'react-native';

const DashboardScreen = props => {
    return (
        <View styles={styles.container}>
            <Text>Dashboard screen</Text>
            <Button title="Selecionar Camión" onPress={() => {
                props.navigation.navigate({routeName: 'TruckActivationService'});
            }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default DashboardScreen;