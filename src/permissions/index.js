/**
 * Permisos de la aplicación
 */

// Dependencias
import * as Permissions from 'expo-permissions'

/**
 * Estandar para solicitar un permiso
 * @param {String} permission Permiso que se va a solicitar;
 */
const _getStandardPermission = async (permission) => {
    let status;
    try {
        // Obtiene el estado del permiso
        status = (await Permissions.getAsync(permission)).status;

        // Si fue concedido responde tru
        if (status) { return status === 'granted'; }

        // De lo contrario se pregunta por el permiso
        status = (await Permissions.askAsync(permission)).status;

        return status === 'granted';
    }
    catch (err) {
        // handleError(err);
    }
    return !!status;
}

/**
 * Solicitud genérica de un permiso
 * @param {String} permission Nombre del permiso
 */
const askPermision = async (permission) => {
    return await _getStandardPermission(permission);
};

const PERMISSIONS = Permissions;

export { PERMISSIONS }
export default askPermision;