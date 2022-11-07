import { CHANGE_INPUT_VALUE, SET_USER, SIGN_UP_SUCCESS, LOGIN_FAILED, LOGOUT, SET_MY_ADS, SET_SINGLE_AD } from '../store/actions';

export const initialState = {
    logged: false,
    name: '',
    id: '',
    email: '',
    password: '',
    token: '',
    role: '',
    showSignUpSuccessMessage: false,
    showLoginFailureMessage: false,
    myAds: []
};
  
const userReducer = (state = initialState, action = {}) => {
    switch (action.type) {
    case CHANGE_INPUT_VALUE:
        return {
            ...state,
            [action.key]: action.value,
        };
    case SET_USER:
        return {
            ...state,
            logged: true,
            name: action.payload.name,
            token: action.payload.token,
            id: action.payload.id,
            role: action.payload.role
        };
    case LOGOUT:
        return {
            ...state,
            logged: action.payload.logged,
            name: action.payload.name,
            token: action.payload.token,
            id: action.payload.id,
            role: action.payload.role
        };
    case SIGN_UP_SUCCESS:
        return {
            ...state,
            showSignUpSuccessMessage: action.payload
        };
    case LOGIN_FAILED:
        return {
            ...state,
            showLoginFailureMessage: action.payload
        };
    case SET_MY_ADS:
        return {
            ...state,
            myAds: action.payload
        };
    case SET_SINGLE_AD:
        return {
            ...state,
            myAds: [...state.myAds, action.payload]
        };
    default:
        return state;
    }
};
  
export default userReducer;