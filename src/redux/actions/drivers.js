import { firestoreDB } from '../../constants/Firebase';
import { getNotificationToken } from '../../utils/notifications';
import moment from 'moment';

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
    const pushToken = await getNotificationToken();
    firestoreDB
      .collection('Drivers')
      .doc(driverId)
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