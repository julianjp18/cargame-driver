/**
 * Hook para obtener la posición actual
 * 
 */

//  Dependencias
import { useEffect, useState } from 'react';

// Utils
import { getCurrentPosition, getAdressFromLocation } from '../utils/location';

/**
 * Hook para obtener la posición actual
 */
const useCurrentPosition = () => {

    const [location, setLocation] = useState(null);

    // Efecto que obtiene la posición actual
    useEffect(() => {
        const get = async () => {
            const location = await getCurrentPosition();
            if (!location) { return; }
            const address = await getAdressFromLocation(location.coords);
            setLocation({ location: location.coords, address });
        };
        get();
    }, []);

    return location;
};

export default useCurrentPosition;