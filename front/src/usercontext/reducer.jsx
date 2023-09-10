export const reducer = (state, action) => {
    switch (action.type) {

        case "USER_LOGIN": {
            return { ...state, token: action.token }
        }

        case "USER_LOGOUT": {
            return { ...state, token: null }; 
        }

        default: {
            return state;
        }
    }
}