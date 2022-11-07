import './style.scss'
import { useDispatch, useSelector } from 'react-redux';
import { changeInputValue, login, setLoginFailure } from '../../store/actions';
import ControlledInput from "../controlledInput";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { toast } from 'react-toastify';

const SigninForm = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const isLogged = useSelector((state) => state.user.logged);
    const role = useSelector((state) => state.user.role);
    
    // Passing the input name and its value to Store.
    const onInputChange = (event) => {
        dispatch(changeInputValue(event.target.name, event.target.value));
    };

    useEffect(() => {
        if (role === 'musicos') {
            return navigate('/homemusicos');
        }; 
        if (role === 'momer') {
            return navigate('/homemomer');
        }
    }, [isLogged]);

    const email = useSelector((state) => state.user.email);
    const password = useSelector((state) => state.user.password);

    const handleRegSubmit = (event) => {
        event.preventDefault();
        dispatch(login());
    };

    const showLoginFailureMessage = useSelector((state) => (state.user.showLoginFailureMessage));
    if (showLoginFailureMessage) {
        toast.error('Valeurs de saisie non valides. Vérifiez votre e-mail et votre mot de passe ou inscrivez-vous.', {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            onClose: dispatch(setLoginFailure(false))
            /* "onCLose" removes the error message, otherwise the message 
            will pop up every time we type anything int the input fields */
        });
    };

    return (
        <form className="signin-form" onSubmit={handleRegSubmit}>
            <h1 className="signin-form__title">Identification</h1>
            <ControlledInput type="email" required inputValue={email} setInputValue={onInputChange} placeHolder="Votre email..." name="email" />
            <ControlledInput type="password" required inputValue={password} setInputValue={onInputChange} placeHolder="Mot de passe..." name="password" />
            <button className='button' type="submit">Connexion</button>
            <Link to="/signup">Pas encore inscrit ?</Link>
        </form>
    );
};

export default SigninForm;
