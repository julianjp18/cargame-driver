
import { useDispatch, useSelector } from 'react-redux';


import {
    setOriginLocation,
    setDestinationLocation
} from '../../redux/actions/places';

const usePlace = () => {

    const data = useSelector(state => state.place);

    const dispatch = useDispatch();

    const dispatchSetOrigin = (payload) => {
        dispatch(setOriginLocation(payload));
    };
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