import { firestoreDB } from '../../constants/Firebase';
export const SHOW_NOTIFICATIONS = 'SHOW_NOTIFICATIONS';

export const showDriverNotifications = () => dispatch => {

    const data = firestoreDB
    .collection("NotificationsDriver")
    .get();

    const notificationsData = [];
    data.then((allNotifications) => {
        allNotifications.forEach(notification => {
            if (
                notification.data().userId === "0" ||
                notification.data().userId === user.userId
            ) {
                notificationsData.push(notification.data());
            }
        });
    });

    dispatch({
        type: SHOW_NOTIFICATIONS,
        driverNotifications: notificationsData
    });
};