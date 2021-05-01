import { firebaseAuth, firestoreDB } from '../../constants/Firebase';
import { getNotificationToken } from '../../utils/notifications';
import moment from 'moment';
import { STATUS } from '../../constants/Utils';
import { VERIFY_ACTIVATION_SERVICE } from './places';
import { authenticate, showError, saveDataToStorage } from './auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CREATE_DRIVER = 'CREATE_DRIVER';
export const SHOW_DRIVER = 'SHOW_DRIVER';
export const CHANGE_PHONE_NUMBER = 'CHANGE_PHONE_NUMBER';
export const CHANGE_PROFILE_PICTURE = 'CHANGE_PROFILE_PICTURE';

export const createDriver = ({
  driverId,
  name,
  numberId,
  phone,
  referidNumber = '',
  ipAdress,
  city,
}) => {
  return async (dispatch) => {
    const jsonValue = await AsyncStorage.getItem('userForSignUp')
    const { email, password } = JSON.parse(jsonValue);
    await firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(async (response) => {
        const resData = response.user;

        resData.getIdToken().then((idToken) => {
          dispatch(authenticate(resData.uid, idToken, email));
          const expirationDate = new Date(new Date().getTime() + parseInt(resData.createdAt) * 1000);
          saveDataToStorage('', resData.uid, expirationDate, email);
        });

        const pushToken = await getNotificationToken();
        firestoreDB
          .collection('Drivers')
          .doc(resData.uid)
          .set({
            name,
            numberId,
            phone,
            referidNumber,
            profilePicture: null,
            isActive: true,
            strikes: 0,
            address: '',
            city,
            drivenLicense: '',
            email: '',
            expireLicense: '',
            expiresPropertyCard: '',
            propertyCard: '',
            created_at: moment().format(),
            ipAdress,
            termsAndConditions: true,
            pushToken,
            isVerified: false,
          });

        if (referidNumber != '') {
          firestoreDB
            .collection('Referrals')
            .doc()
            .set({
              identification: numberId,
              referralId: referidNumber,
              created_at: moment().format(),
            });
        }

        dispatch({
          type: CREATE_DRIVER,
          driverId,
          id: name,
          name,
          numberId,
          phone,
          city,
          referidNumber: referidNumber ? referidNumber : '',
          profilePicture: null,
          pushToken
        });
      })
      .catch(error => {
        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode === 'auth/email-already-in-use') {
          errorMessage = 'El correo electrónico se encuentra en uso. Intentalo nuevamente.'
        } else if (errorCode === 'OPERATION_NOT_ALLOWED') {
          errorMessage = 'Usuario y/o contraseña incorrecta. Intentelo nuevamente.'
        } else if (errorCode === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
          errorMessage = 'Se ha decidido bloquear la actividad de este dispositivo. Intenta más tarde.';
        }

        dispatch(showError(errorMessage));
      });
  }
};

export const showDriver = (driverId) => async dispatch => {
  if (driverId) {
    const data = (await firestoreDB
      .collection('Drivers')
      .doc(driverId)
      .get().then((doc) => doc.data())) || {};

    const pushToken = await getNotificationToken();
    if (pushToken && (!data.pushToken || data.pushToken !== pushToken)) {
      data.pushToken = pushToken;
      firestoreDB
        .collection('Drivers')
        .doc(driverId)
        .set({ pushToken }, { merge: true });
    }

    dispatch({
      type: SHOW_DRIVER,
      driverId,
      id: data.numberId,
      name: data.name,
      numberId: data.numberId,
      phone: data.phone,
      referidNumber: data.referidNumber,
      profilePicture: data.profilePicture,
      pushToken: data.pushToken
    });
  }
};

export const changePhoneNumber = (phoneNumber, driverId) => async dispatch => {
  const data = await firestoreDB
    .collection('Drivers')
    .doc(driverId)
    .get().then((doc) => doc.data());

  const newData = {
    ...data,
    phone: phoneNumber,
  }
  const updateData = await firestoreDB.collection('Drivers').doc(driverId).set(newData);
  dispatch({
    type: CHANGE_PHONE_NUMBER,
    driverId,
    phone: phoneNumber,
  });
};

export const changeProfilePicture = (profilePicture, driverId) => async dispatch => {
  const data = await firestoreDB
    .collection('Drivers')
    .doc(driverId)
    .get().then((doc) => doc.data());

  const newData = {
    ...data,
    profilePicture,
  }

  const updateData = await firestoreDB.collection('Drivers').doc(driverId).set(newData);
  dispatch({
    type: CHANGE_PROFILE_PICTURE,
    driverId,
    profilePicture,
  });
};

export const verifyDriverActivation = (driverId) => async dispatch => {

  await firestoreDB
    .collection('DriversLocation')
    .where("driverId", "==", driverId).onSnapshot((querySnapshot) => {
      var notificationsData = [];

      querySnapshot.forEach((doc) => {
        if (doc.data().status == STATUS.ACTIVE) {
          notificationsData.push({
            ...doc.data(),
            origin: {
              address: doc.data().originAddress,
              location: doc.data().originLocation,
            },
            destination: {
              address: doc.data().destinationAddress,
              location: doc.data().destinationLocation,
            },
            id: doc.id,
          });
        }
      });

      if (notificationsData.length > 0) {

        dispatch({
          type: VERIFY_ACTIVATION_SERVICE,
          payload: notificationsData[0],
        });
      }
    });
};
