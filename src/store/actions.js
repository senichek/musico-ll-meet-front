export const LOGIN = 'LOGIN';
export const CHANGE_INPUT_VALUE = 'CHANGE_INPUT_VALUE';
export const SET_USER = 'SET_USER';
export const SIGN_UP = 'SIGN_UP';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT = 'LOGOUT';
export const SET_MY_ADS = 'SET_MY_ADS';
export const SET_SINGLE_AD = 'SET_SINGLE_AD';

export const login = () => ({
    type: LOGIN,
});

export const changeInputValue = (inputName, inputValue) => ({
    type: CHANGE_INPUT_VALUE,
    key: inputName,
    value: inputValue,
});

export const setUser = (data) => ({
    type: SET_USER,
    payload: data,
});

export const signUp = (data) => ({
    type: SIGN_UP,
    payload: data,
});

export const setSignUpSuccess = (data) => ({
    type: SIGN_UP_SUCCESS,
    payload: data,
});

export const setLoginFailure = (data) => ({
    type: LOGIN_FAILED,
    payload: data,
});

export const logout = (data) => ({
    type: LOGOUT,
    payload: data,
});

export const setMyAds = (data) => ({
    type: SET_MY_ADS,
    payload: data,
});

export const setSingleAd = (data) => ({
    type: SET_SINGLE_AD,
    payload: data,
});
