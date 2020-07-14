import { firestoreDB } from '../../constants/Firebase';
export const SHOW_NOTIFICATIONS = 'SHOW_NOTIFICATIONS';

export const showDriverNotifications = (userId) => dispatch => {

    const data = firestoreDB
    .collection("Notifications_Drivers");

    dispatch({
        type: SHOW_NOTIFICATIONS,
        driverNotifications: data
    });
};