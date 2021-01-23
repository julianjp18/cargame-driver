/**
 * Hook para obtener un permiso
 * 
 */
import { useState } from 'react';

// Util
import askPermision, { PERMISSIONS } from '../permissions';

/**
 * Hook para obtener un permiso
 * 
 * @param {String} name       Nombre del permiso debe ser de una constante
 * @param {Function} [onDeny] Función de retorno en caso de rechazo
 */
const usePermission = (name, onDeny) => {

    const [permission, setPermission] = useState(null);

    useState(() => {

        const _askPermission = async () => {
            const _permission = await askPermision(name);
            if (onDeny && !_permission) {
                onDeny();
            }
            setPermission(_permission);
        };
        _askPermission();
    }, [])

    return permission;
};

export { PERMISSIONS };
export default usePermission;