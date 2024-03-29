import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Icon, ListItem } from 'react-native-elements';
import { darkGrey, primaryColor } from '../../constants/Colors';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import DriverHeader from '../../components/DriverHeader';
import { shortBrandOrangeGreyUrl } from '../../constants/Utils';
import ImgPicker from '../../components/UI/ImagePicker';
import * as MediaLibrary from 'expo-media-library';

import * as driverActions from '../../redux/actions/drivers';
import * as authActions from '../../redux/actions/auth';
import { getUserInfo } from '../../utils/helpers';
import { normalizeLength } from '../../styles/layout';

const LogOutListItem = props => (
  <TouchableOpacity>
    <ListItem
      onPress={() => {
        props.dispatch(authActions.logout());
        props.navigate('Auth');
      }}
      containerStyle={styles.listContainer}
      topDivider
    >
      <Icon
        name='logout'
        type='antdesign'
        color={primaryColor}
      />
      <ListItem.Content>
        <ListItem.Title style={styles.titleListItem}>Cerrar sesión</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  </TouchableOpacity>
);

const DriverProfileScreen = props => {
  const driverUser = useSelector(state => state.driver);
  const userEmail = useSelector(state => state.auth.email);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert('¡Oh no, un error ha ocurrido!', error, [{ text: 'Está bien' }]);
    }
  }, [error]);

  getUserInfo().then((data) => {
    if (data) {
      const userInfo = JSON.parse(data);
      if (userInfo.idToken === '') {
        dispatch(authActions.logout());
        props.navigation.navigate('Index');
      }
    } else {
      dispatch(authActions.logout());
      props.navigation.navigate('Index');
    }
  });

  const imageTakeHandler = async (imagePath) => {
    if (imagePath) {
      try {
        const asset = await MediaLibrary.createAssetAsync(imagePath);
        const controller = new AbortController();
        setError(null);
        try {
          await dispatch(driverActions.changeProfilePicture(asset.uri, driverUser.driverId));
          const savedImage = await MediaLibrary.saveToLibraryAsync(imagePath);
          controller.abort();
        } catch (err) {
          setError(err.message);
        }
        controller.abort();
      } catch (err) {
        throw err;
      }
    }
  };

  return (
    <View style={styles.servicesContainer}>
      <DriverHeader
        title="Mi perfil"
        subtitle="Explora tu perfil aquí"
        leftIcon="user-o"
      />
      {driverUser ? (
        <ScrollView>
          <View style={styles.infoContainer}>
            <View style={styles.nameListContainer}>
              <Text style={styles.nameListText}>
                {driverUser.name}
              </Text>
            </View>
            <View style={styles.row}>
              <View style={styles.col1}>
                <ImgPicker onImageTaken={imageTakeHandler} />
              </View>
              <View style={styles.col2}>
                <Image
                  source={shortBrandOrangeGreyUrl}
                  style={styles.mainCarga}
                />
              </View>
            </View>
            <ListItem containerStyle={styles.listContainer} topDivider bottomDivider>
              <Icon
                name='idcard'
                type='antdesign'
                color={primaryColor}
              />
              <ListItem.Content>
                <ListItem.Title style={styles.titleListItem}>Cédula de ciudadanía</ListItem.Title>
                <ListItem.Subtitle style={styles.subtitleListItem}>{driverUser.numberId}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
            <TouchableOpacity>
              <ListItem onPress={() => props.navigation.navigate('EditPhoneNumber')} containerStyle={styles.listContainer} bottomDivider>
                <Icon
                  name='phone'
                  type='antdesign'
                  color={primaryColor}
                />
                <ListItem.Content>
                  <ListItem.Title style={styles.titleListItem}>Celular</ListItem.Title>
                  <ListItem.Subtitle style={styles.subtitleListItem}>{driverUser.phone}</ListItem.Subtitle>
                </ListItem.Content>
                <Icon
                  name='angle-right'
                  type='font-awesome'
                  color={primaryColor}
                />
              </ListItem>
            </TouchableOpacity>
            <ListItem containerStyle={styles.listContainer} bottomDivider>
              <Icon
                name='mail'
                type='antdesign'
                color={primaryColor}
              />
              <ListItem.Content>
                <ListItem.Title style={styles.titleListItem}>Correo electrónico</ListItem.Title>
                <ListItem.Subtitle style={styles.subtitleListItem}>{userEmail}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
            <ListItem containerStyle={styles.listContainer} bottomDivider>
              <Icon
                name='pencil'
                type='font-awesome'
                color={primaryColor}
              />
              <ListItem.Content>
                <ListItem.Title style={styles.titleListItem}>Referido por</ListItem.Title>
                <ListItem.Subtitle style={styles.subtitleListItem}>
                  {driverUser.referidNumber ? driverUser.referidNumber : 'No tiene código de referido'}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
            <ListItem containerStyle={styles.listContainer} bottomDivider>
              <Icon
                name='earth'
                type='antdesign'
                color={primaryColor}
              />
              <ListItem.Content>
                <ListItem.Title style={styles.titleListItem}>País</ListItem.Title>
                <ListItem.Subtitle style={styles.subtitleListItem}>Colombia</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
            <LogOutListItem
              dispatch={dispatch}
              navigate={props.navigation.navigate}
            />
          </View>
        </ScrollView>
      ) : (<LogOutListItem dispatch={dispatch} navigate={props.navigation.navigate} />)}

    </View>
  );
};

const styles = StyleSheet.create({
  servicesContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    minHeight: normalizeLength(300)
  },
  nameListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: normalizeLength(20),
    paddingBottom: normalizeLength(20)
  },
  nameListText: {
    color: primaryColor,
    fontFamily: 'Quicksand',
    fontSize: normalizeLength(25),
    fontWeight: '700'
  },
  row: {
    flexDirection: 'row',
    minWidth: normalizeLength(300),
    marginTop: normalizeLength(4)
  },
  col1: {
    minWidth: normalizeLength(180),
    alignItems: 'center',
    justifyContent: 'center'
  },
  col2: {
    minWidth: normalizeLength(200),
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainCarga: {
    width: normalizeLength(120),
    height: normalizeLength(120),
  },
  titleListItem: {
    color: primaryColor,
    fontFamily: 'Quicksand',
    fontSize: normalizeLength(14),
    fontWeight: '700'
  },
  subtitleListItem: {
    color: darkGrey,
    fontFamily: 'Quicksand',
    fontSize: normalizeLength(13),
    lineHeight: 24
  },
  listContainer: {
    backgroundColor: 'transparent',
    paddingBottom: normalizeLength(6)
  }
});

export default DriverProfileScreen;