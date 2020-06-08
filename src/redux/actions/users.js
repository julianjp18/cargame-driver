export const CREATE_USER = 'CREATE_USER';

export const createUser = (name, numberId, address, phone) => {
    return async dispatch => {
        const response = await fetch('https://test-liftit-a74d6.firebaseio.com/users.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                numberId,
                address,
                phone
            })
        });

        const resData = await response.json();

        console.log(resData);

        dispatch({
            type: CREATE_USER,
            userData: {
                id: resData.name,
                name,
                numberId,
                address,
                phone
            }
        });
    };
};