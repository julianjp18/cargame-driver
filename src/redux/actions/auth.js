export const SIGNUP = 'SIGNUP';

export const signup = (emaill, password) => {
    return async dispatch => {
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDIw1u3pmQkq_0dBcvDHUMIIvcJ7nPxqmo ',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }    
        );

        if (!response.ok) {

        }

        const resData = await response.json();
        dispatch({ type: SIGNUP});
    };
};
