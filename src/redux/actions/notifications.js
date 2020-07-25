import { firestoreDB } from '../../constants/Firebase';
export const SHOW_NOTIFICATIONS = 'SHOW_NOTIFICATIONS';

export const showDriverNotifications = () => dispatch => {

    const data = firestoreDB
    .collection("NotificationsDriver")
    .get();

    dispatch({
        type: SHOW_NOTIFICATIONS,
        driverNotifications: data
    });
};