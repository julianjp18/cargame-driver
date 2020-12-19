import { firestoreDB } from '../../constants/Firebase';
import moment from 'moment';
export const SHOW_NOTIFICATIONS = 'SHOW_NOTIFICATIONS';

export const showDriverNotifications = (driverId) => async dispatch => {

  const data = await firestoreDB
    .collection('NotificationsDriver')
    .get().then((allNotifications) => allNotifications);

  const notificationsData = [];
  if (data) {
    data.forEach(notification => {
      if (
        notification.data().driverId === "0" ||
        notification.data().driverId === driverId
      ) {
        notificationsData.push({ ...notification.data() });
      }
    });
  }

  dispatch({
    type: SHOW_NOTIFICATIONS,
    driverNotifications: notificationsData
  });
};

export const createOfferNotificationForUser = (userId, offerId) => {
  firestoreDB
    .collection("NotificationsUsers")
    .add({
      date: moment(new Date()).format('ll'),
      message: '¡Se ha encontrado una oferta acorde a tu solicitud! por favor revisa tu solicitud aquí',
      offerId,
      typeMessage: 'Information',
      userId,
      status: 'CONTRACTED'
    }).then(() => true);
};