/**
 * Hook para obtener la posición actual
 * 
 */

//  Dependencias
import { useEffect, useState } from 'react';

// Hooks
import usePermission, { PERMISSIONS } from './usePermission';

// Utils
import { getCurrentLocation, getAdressFromLocation } from '../utils/location';

/**
 * Hook para obtener la posición actual
 * 
 * @param {Function} [onDeny] Función de retorno en caso de rechazar
 *                            permisos de ubicación
 */
const useCurrentPosition = (onDeny) => {

    const [position, setPosition] = useState(null);

    // Solicita permisos de ubicación
    const permission = usePermission(PERMISSIONS.LOCATION, onDeny);

    // Efecto que obtiene la posición actual
    useEffect(() => {
        const get = async () => {
            const location = await getCurrentLocation();
            if (!location) { return; }
            const address = await getAdressFromLocation(location.coords);
            setPosition({ location: location.coords, address });
        };
        if (permission) {
            get();
        }
    }, [permission]);

    return position;
};

export default useCurrentPosition;