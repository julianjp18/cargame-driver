// Dependencias
import { Notifications } from 'expo';
import Constants from 'expo-constants';

// Permisos
import askPermision, { PERMISSIONS } from '../utils/permissions';

// Notifications.setNotificationHandler({
//     handleNotification: async () => ({
//         shouldShowAlert: true,
//         shouldPlaySound: true,
//         shouldSetBadge: false,
//     }),
// });

/**
 * Registra el dispositivo y obtiene un token de notificación
 */
export const getNotificationToken = async () => {
    let token;
    try {
        if (Constants.isDevice) {
            const status = await askPermision(PERMISSIONS.NOTIFICATIONS);
            if (!status) { return token; }
            token = await Notifications.getExpoPushTokenAsync();
        }

        if (Platform.OS === 'android') {
            Notifications.createChannelAndroidAsync('default', {
                name: 'default',
                sound: true,
                priority: 'max',
                vibrate: [0, 250, 250, 250],
            });
        }
    }
    catch (err) {
        // No se hace nada con este error
    }

    return token;
};