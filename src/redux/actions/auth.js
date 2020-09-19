import { firebaseAuth } from '../../constants/Firebase';
import { AsyncStorage } from 'react-native';
import ENV from '../../../env';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const IS_SIGNUP = 'IS_SIGNUP';
export const CHANGE_TYPE_SERVICE_SELECTED = 'CHANGE_TYPE_SERVICE_SELECTED';

const API_KEY = ENV.firebaseApiKey;
const API_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:';

export const authenticate = (localId, idToken, email) => {
  return {
    type: AUTHENTICATE,
    driverId: localId,
    idToken,
    email,
  };
};

const signUp = (email, password) => {
  return async dispatch => {
    const response = await fetch(API_URL + 'signUp?key=' + API_KEY,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true
        })
      }
    );

    const resData = await response.json();

    if (!response.ok) {
      const errorId = resData.error.message;
      let message = '¡UPS! Algo ocurrió.';
      if (errorId === 'EMAIL_EXISTS') {
        message = 'El correo electrónico se encuentra en uso. Intentalo nuevamente.'
      } else if (errorId === 'OPERATION_NOT_ALLOWED') {
        message = 'Usuario y/o contraseña incorrecta. Intentelo nuevamente.'
      } else if (errorId === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
        message = 'Se ha decidido bloquear la actividad de este dispositivo. Intenta más tarde.';
      }
      throw new Error(message);
    }

    dispatch(authenticate(resData.localId, resData.idToken, email));
    const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
    saveDataToStorage(resData.idToken, resData.localId, expirationDate, email);
  };
};

export const signup = (email, password) => async dispatch => {
  await firebaseAuth
    .createUserWithEmailAndPassword(email, password)
    .then((response) => {
      const resData = response.user;
      
      resData.getIdToken().then((idToken) => {
        dispatch(authenticate(resData.uid, idToken, email));
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.createdAt) * 1000);
        saveDataToStorage(idToken, resData.uid, expirationDate, email);
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

      throw new Error(errorMessage);
    });
};

const signIn = (email, password) => {

  return async dispatch => {
    const response = await fetch(
      API_URL + 'signInWithPassword?key=' + API_KEY,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {

      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = '¡UPS! Algo ocurrió. Por favor intentalo nuevamente.';
      if (errorId === 'EMAIL_NOT_FOUND') {
        message = 'No reconocemos este correo electrónico. Intentalo nuevamente.'
      } else if (errorId === 'INVALID_PASSWORD') {
        message = 'Usuario y/o contraseña incorrecta. Intentelo nuevamente.'
      }
      throw new Error(message);
    }

    const resData = await response.json();
    const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
    saveDataToStorage(resData.idToken, resData.localId, expirationDate, email);
    dispatch(authenticate(resData.localId, resData.idToken, email));
  };
};

export const signin = (email, password) => async dispatch => {
  await firebaseAuth
    .signInWithEmailAndPassword(email, password)
    .then((response) => {
      const resData = response.user;
      resData.getIdToken().then((idToken) => {
        dispatch(authenticate(resData.uid, idToken, email));
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.createdAt) * 1000);
        saveDataToStorage(idToken, resData.uid, expirationDate, email);
      });
    })
    .catch(error => {
      let errorCode = error.code;
      let errorMessage = error.message;

      if (errorCode === 'EMAIL_NOT_FOUND') {
        errorMessage = 'No reconocemos este correo electrónico. Intentalo nuevamente.'
      } else if (errorCode === 'INVALID_PASSWORD') {
        errorMessage = 'Usuario y/o contraseña incorrecta. Intentelo nuevamente.'
      }

      throw new Error(errorMessage);
    });
};

const saveDataToStorage = (idToken, uid, expirationDate, email) => {
  AsyncStorage.setItem(
    'driverData',
    JSON.stringify({
      token: idToken,
      driverId: uid,
      expirationDate: expirationDate,
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