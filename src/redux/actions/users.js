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

export const showUser = (userId) => async dispatch => {
    const data = await firestoreDB
        .collection('Drivers')
        .doc(userId)
        .get().then((doc) => doc.data());
    console.log(data);
    dispatch({
        type: SHOW_USER,
        userId,
        id: data.numberId,
        name: data.name,
        numberId: data.numberId,
        phone: data.phone,
        referidNumber: data.referidNumber
    });
};