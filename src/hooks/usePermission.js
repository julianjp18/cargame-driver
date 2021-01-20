
import { useState } from 'react';

import askPermision, { PERMISSIONS } from '../permissions';

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