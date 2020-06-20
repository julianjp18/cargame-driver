export const CREATE_USER = 'CREATE_USER';
export const SHOW_USER = 'SHOW_USER';
const API_URL = 'https://cargame-transporte-001.firebaseio.com/';

export const createUser = ({ userId, name, numberId, phone, referidNumber }) => {
    return async dispatch => {
        const response = await fetch( API_URL + 'drivers.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId,
                name,
                numberId,
                phone,
                referidNumber
            })
        });

        const resData = await response.json();

        console.log(resData);

        dispatch({
            type: CREATE_USER,
            userId,
            id: resData.name,
            name,
            numberId,
            phone,
            referidNumber
        });
    };
};