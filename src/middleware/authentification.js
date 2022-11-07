import axios from 'axios';
import { LOGIN, setUser, SIGN_UP, setSignUpSuccess, setLoginFailure } from '../store/actions';
import { API_BASE_URL } from '../constants';
import { toast } from 'react-toastify';

const authentification = (store) => (next) => async (action) => {
    switch (action.type) {
    case LOGIN: {
        const state = store.getState();
        const { email, password } = state.user;
        try {
            const { data } = await axios.post(`${API_BASE_URL}/signin`, {
                email,
                password,
            });
            store.dispatch(setUser(data));
            // Store the user in localStorage
            // Local storage only supports string datatype
            localStorage.setItem('loggedInUser', JSON.stringify({...data, connectedAt: new Date()}));
        } catch (error) {
            console.log(error);
            store.dispatch(setLoginFailure(true));
        }
        break;
    }
    case SIGN_UP: {
        const { name, city, county, email, password, password2, role } = action.payload;
        try {
            const { data } = await axios.post(`${API_BASE_URL}/signup`, {
                name,
                email,
                city: city.value,
                county: county.value,
                role,
                password,
                password2
            });
            store.dispatch(setUser(data));
            // Store the user in localStorage
            // Local storage only supports string datatype
            localStorage.setItem('loggedInUser', JSON.stringify({...data, connectedAt: new Date()}));
            // If there is token it means that signup was successful
            if (data.token) {
                store.dispatch(setSignUpSuccess(true));
            }
        } catch (error) {
            console.log(error);
            let errorMessage;
            if (error.response.data.message.includes("duplicate key")) {
                errorMessage = "E-mail a déjà été utilisé."
            } else {
                errorMessage = error.response.data.message;
            }
            toast.error(`Erreur. ${errorMessage}`, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        break;
    }
    default:
        next(action);
        break;
    }
};

export default authentification;