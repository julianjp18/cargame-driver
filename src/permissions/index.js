/**
 * Permisos de la aplicación
 */
// Dependencias
import * as Permissions from 'expo-permissions'

// Util
// import handleError from '../helpers/handleError';

/**
 * Estandar para solicitar un permiso
 * @param {String} permission Permiso que se va a solicitar;
 */
const _getStandardPermission = async (permission) => {
    let status;
    try {
        status = (await Permissions.getAsync(permission)).status;

        if (status) { return status === 'granted'; }

        status = (await Permissions.askAsync(permission)).status;

        return status === 'granted';
    }
    catch (err) {
        // handleError(err);
    }
    return !!status;
}

const askPermision = async (permission) => {
    return await _getStandardPermission(permission)
};

const PERMISSIONS = Permissions;

export { PERMISSIONS }
export default askPermision;
