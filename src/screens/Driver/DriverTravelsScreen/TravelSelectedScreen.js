import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import DriverHeader from '../../../components/DriverHeader';
import { AntDesign, FontAwesome } from '@expo/vector-icons'; 
import { primaryColor, accentColor } from '../../../constants/Colors';

import * as authActions from '../../../redux/actions/auth';
import { getUserInfo } from '../../../utils/helpers';
import { LinearGradient } from 'expo-linear-gradient';

const styles = StyleSheet.create({
  travelSelectedContainer: {
    backgroundColor: 'transparent',
    height: '100%'
  },
  titleContainer: {
    marginTop: '2%',
    marginLeft: '5%',
    marginBottom: '1%'
  },
  title: {
    color: primaryColor,
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Quicksand',
    lineHeight: 24,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    marginTop: '2%',
    marginBottom: '4%',
  },
  col1: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '5%',
  },
  col2: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoUserText: {
    marginLeft: '5%',
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Ruda',
    fontWeight: '900'
  },
});

const TravelSelectedScreen = props => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.user);

  getUserInfo().then((data) => {
    const userInfo = JSON.parse(data);

    if (!userInfo.token) {
      dispatch(authActions.logout());
      props.navigation.navigate('Index');
    }
  });

  return (
    <View style={styles.travelSelectedContainer}>
      <DriverHeader
        title="Mis viajes"
        subtitle="Explora tus viajes"
        leftIcon="flag"
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Datos del cliente</Text>
      </View>
      <LinearGradient
        start={{ x: -1, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={[
            props.colorOne ? props.colorOne : primaryColor,
            props.colorTwo ? props.colorTwo : accentColor
        ]}
      >
          <View style={styles.row}>
              <View style={styles.col1}>
                  <View style={styles.row}>
                    <View>
                      <AntDesign name="user" size={24} color="white" />
                    </View>
                    <View>
                      <Text style={styles.infoUserText}>{user && user.name}</Text>
                    </View>
                  </View>
                  <View style={styles.row}>
                    <View>
                      <AntDesign name="phone" size={24} color="white" />
                    </View>
                    <View>
                      <Text style={styles.infoUserText}>{user && user.phone}</Text>
                    </View>
                  </View>
              </View>
              <View style={styles.col2}>
                <FontAwesome name="user-circle-o" size={34} color="white" />
              </View>
          </View>
      </LinearGradient>
    </View>
  );
};

export default TravelSelectedScreen;