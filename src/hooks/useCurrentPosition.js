import { useEffect, useState } from 'react';

import { getCurrentPosition, getAdressFromLocation } from '../utils/location';

const useCurrentPosition = () => {

    const [location, setLocation] = useState(null);

    useEffect(() => {
        const get = async () => {
            const location = await getCurrentPosition();
            const address = await getAdressFromLocation(location.coords);
            setLocation(location || address ? { location, address } : null);
        };
        get();
    }, []);

    return location;
};

export default useCurrentPosition;