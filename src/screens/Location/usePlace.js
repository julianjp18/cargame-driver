/**
 * Hook Place de Redux
 */
import { useDispatch, useSelector } from 'react-redux';

// Acciones
import {
    setOriginLocation,
    setDestinationLocation
} from '../../redux/actions/places';

/**
 * Hook Place de Redux
 */
const usePlace = () => {

    // Obtiene datos del Store
    const data = useSelector(state => state.place);

    const dispatch = useDispatch();

    /**
     * Establece el lugar de origen
     * @param {Object} payload datos
     */
    const dispatchSetOrigin = (payload) => {
        dispatch(setOriginLocation(payload));
    };

    /**
     * Establece el lugar de destino
     * @param {Object} payload datos
     */
    const dispatchSetDestination = (payload) => {
        dispatch(setDestinationLocation(payload));
    };

    return [
        data,
        {
            dispatchSetOrigin,
            dispatchSetDestination
        }
    ];
};

export default usePlace;