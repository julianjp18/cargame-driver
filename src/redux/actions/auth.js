import { firebaseAuth, firestoreDB } from '../../constants/Firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const IS_SIGNUP = 'IS_SIGNUP';
export const CHANGE_TYPE_SERVICE_SELECTED = 'CHANGE_TYPE_SERVICE_SELECTED';
export const ERROR = 'ERROR';

export const authenticate = (uid, idToken, email) => {
  return {
    type: AUTHENTICATE,
    driverId: uid,
    idToken,
    email,
  };
};

export const showError = (error) => {
  return {
    type: ERROR,
    message: error,
  };
};

export const signup = (email, password) => async dispatch => {
  const jsonValue = JSON.stringify({
    email,
    password,
  });
  await AsyncStorage.setItem('userForSignUp', jsonValue);
};

export const signin = (email, password) => async dispatch => {
  await firebaseAuth
    .signInWithEmailAndPassword(email, password)
    .then(async (response) => {
      const resData = response.user;

      await firestoreDB
        .collection('Drivers')
        .doc(resData.uid)
        .get().then((doc) => {
          let isError = false;
          if (doc.data()) {
            const { isVerified } = doc.data();

            if (isVerified) {
              resData.getIdToken().then((idToken) => {
                const expirationDate = new Date(new Date().getTime() + parseInt(resData.createdAt) * 1000);
                saveDataToStorage(idToken, resData.uid, expirationDate, email);
                dispatch(authenticate(resData.uid, idToken, email));
              });
            } else isError = true;
          } else isError = true;

          if (isError) {
            const message = 'Te faltan completar datos en la plataforma. Completalos y vuelve a ingresar nuevamente.';
            dispatch(showError(message));
            throw new Error(message);
          }
        });


    })
    .catch(error => {
      let errorCode = error.code;
      let errorMessage = error.message;

      if (errorCode === 'EMAIL_NOT_FOUND') {
        errorMessage = 'No reconocemos este correo electrónico. Intentalo nuevamente.'
      } else if (
        errorCode === 'INVALID_PASSWORD' ||
        errorMessage === 'The password is invalid or the user does not have a password.'
      ) {
        errorMessage = 'Usuario y/o contraseña incorrecta. Intentelo nuevamente.'
      } else if (
        errorCode === 'TOO_MANY_ATTEMPTS_TRY_LATER' ||
        errorMessage === 'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.'
      ) {
        errorMessage = 'Se ha decidido bloquear la actividad de este dispositivo. Intenta más tarde.';
      }

      dispatch(showError(errorMessage));
      throw new Error(errorMessage);
    });
};

export const saveDataToStorage = (idToken, uid, expirationDate, email) => {
  AsyncStorage.setItem(
    'driverData',
    JSON.stringify({
      idToken,
      driverId: uid,
      expirationDate,
      email,
    }))
};

export const setIsSignUp = () => {
  return { type: IS_SIGNUP, isSignUp: true };
};

export const setTypeService = (service) => {
  return { type: CHANGE_TYPE_SERVICE_SELECTED, typeServiceSelected: service };
};

export const logout = () => {
  AsyncStorage.clear();
  return { type: LOGOUT };
};