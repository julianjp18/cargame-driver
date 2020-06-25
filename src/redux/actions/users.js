import { firestoreDB } from '../../constants/Firebase';
export const CREATE_USER = 'CREATE_USER';
export const SHOW_USER = 'SHOW_USER';

export const createUser = ({ userId, name, numberId, phone, referidNumber }) => {
    return async dispatch => {
        firestoreDB
            .collection('Drivers')
            .doc(userId)
            .set({
                name,
                numberId,
                phone,
                referidNumber
            });

        dispatch({
            type: CREATE_USER,
            userId,
            id: name,
            name,
            numberId,
            phone,
            referidNumber
        });
    };
};

export const showUser = (userId) => {
    return async dispatch => {
        const response = await firestoreDB
        .collection('Drivers')
        .doc(userId)
        .get();

        const resData = await response.json();
        dispatch({
            type: SHOW_USER,
            userId,
            id: resData.name,
            name: resData.name,
            numberId,
            phone,
            referidNumber
        });
    };
};