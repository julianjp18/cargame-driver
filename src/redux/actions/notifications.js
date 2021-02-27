import { firestoreDB } from '../../constants/Firebase';
import moment from 'moment';
import { CONTRACTED } from '../../utils/constantsStatusOffers';
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
        notificationsData.push({ ...notification.data(), id: notification.id });
      }
    });
  }

  const dataConfirmationPayments = await firestoreDB
    .collection('ConfirmationPayments')
    .where("driverId", "==", driverId)
    .get().then((allNotifications) => allNotifications);

  if (dataConfirmationPayments.length > 0) {
    dataConfirmationPayments.forEach(notification => {
      notificationsData.push({ ...notification.data(), id: notification.id, message: 'Tu pago se encuentra confirmado, mira el resumen de tu servicio', driverId });
    });
  }

  dispatch({
    type: SHOW_NOTIFICATIONS,
    driverNotifications: notificationsData
  });
};

export const createOfferNotificationForUser = (userId, offerId, notificationId) => {
  firestoreDB
    .collection("NotificationsUsers")
    .add({
      date: moment(new Date()).format('ll'),
      message: '¡Se ha encontrado una oferta acorde a tu solicitud! por favor revisa tu solicitud aquí',
      offerId,
      typeMessage: 'Information',
      userId,
      status: CONTRACTED
    }).then(() => true);
};
