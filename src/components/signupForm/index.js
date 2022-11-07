import './style.scss';

import { useState, useEffect } from "react";
import ControlledInput from "../controlledInput";
import DeptsDropdown from "../departementsDropdown";
import CitiesDropdown from "../citiesDropdown";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../../store/actions';
import { Link, useNavigate } from 'react-router-dom';

const SignupForm = () => {
    // Not sure if we'll need this state anywhere else
    // this is why it's not in store but here.
    const [role, setRole] = useState("");
    const [inputName, setInputName] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [selectedDept, setSelectedDept] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    const [deptCodes, setDeptCodes] = useState([]);

    const isLogged = useSelector((state) => state.user.logged);
    const userRole = useSelector((state) => state.user.role);

    const navigate = useNavigate();

    useEffect(() => {
        if (userRole === 'musicos') {
            return navigate('/homemusicos');
        }; 
        if (userRole === 'momer') {
            return navigate('/homemomer');
        }
    }, [isLogged]);

    const dispatch = useDispatch();

    const onInputChange = (event) => {
        //dispatch(changeInputValue(event.target.name, event.target.value));
        switch (event.target.name) {
        case 'name':
            setInputName(event.target.value);
            break;
        case 'email':
            setInputEmail(event.target.value);
            break;
        case 'password':
            setInputPassword(event.target.value);
            break;
        case 'confirmPassword':
            setConfirmPassword(event.target.value);
            break;
        default:
            console.log(`No inputs in sign-up`);
        }
    };

    const handleRegSubmit = (event) => {
        event.preventDefault();
        console.log(role);
        console.log(inputName);
        console.log(inputEmail);
        console.log(inputPassword);
        console.log(selectedDept);
        console.log(selectedCity);
        if (inputPassword !== confirmPassword) {
            toast.info('Assurez-vous que les mots de passe sont les mêmes', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            const userToSignUp = {
                name: inputName,
                email: inputEmail,
                city: selectedCity,
                county: selectedDept,
                role: role,
                password: inputPassword,
                password2: confirmPassword
            }
            dispatch(signUp(userToSignUp));
        }
    // The details will be sent to the server via dispatch (we will create the redux middleware)
    };

    const handleRadioBtnChange = (event) => {
        setRole(event.target.value);
    };

    // We need the departments codes to pick the cities from these departements, 
    // cause we cannot show the dropdown of 3500 cities, it's too slow.
    const getDepartmentsCodes = () => {
        // if we choose one department from the list it's going to be an object.
        // if we choose two and more - there is going to be an array.
        console.log(selectedDept);
        if (typeof selectedDept === 'object') {
            setDeptCodes([selectedDept.code]);
        } else {
            const codes = selectedDept.map(dept => (dept.code));
            setDeptCodes(codes);
        }
    }

    const showSignUpSuccessMessage = useSelector((state) => (state.user.showSignUpSuccessMessage));
    if (showSignUpSuccessMessage) {
        toast.success('Le compte a été créé', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    return (
        <form className="signup-form" onSubmit={handleRegSubmit}>
            <h1 className="signup-form__title">Inscription</h1>
            <div className="signup-form__radios">
                <div className='signup-form__radios__input'>
                    <input
                        type="radio"
                        id="musico"
                        name="role"
                        value="musicos"
                        onChange={handleRadioBtnChange}
                    />
                    <label htmlFor="musico"><h3 className='signup-form__type'>Musicos</h3></label>
                    <p>Musicien ou représentant d'un groupe</p>
                </div>
                <div className='signup-form__radios__input'>
                    <input
                        type="radio"
                        id="momer"
                        name="role"
                        value="momer"
                        onChange={handleRadioBtnChange}
                    />
                    <label htmlFor="momer"><h3 className='signup-form__type'>MoMers</h3></label>
                    <p>Organisateur</p>
                </div>
            </div>
            <DeptsDropdown selectedOption={selectedDept} setSelectedOption={setSelectedDept} onFocusOut={getDepartmentsCodes} isMulti={false} />
            <CitiesDropdown selectedOption={selectedCity} setSelectedOption={setSelectedCity} departmentCodes={deptCodes} isMulti={false} />
            <ControlledInput type="text" required inputValue={inputName} setInputValue={onInputChange} placeHolder="Nom d'établissement ou band..." name="name" />
            <ControlledInput type="email" required inputValue={inputEmail} setInputValue={onInputChange} placeHolder="Votre email..." name="email" />
            <ControlledInput type="password" required inputValue={inputPassword} setInputValue={onInputChange} placeHolder="Mot de passe..." name="password" />
            <ControlledInput type="password" required inputValue={confirmPassword} setInputValue={onInputChange} placeHolder="Confirmer votre mot de passe..." name="confirmPassword" />
            <button className='button' type="submit">Valider</button>
            <Link to="/signin">Déjà inscrit ?</Link>
        </form>
    );
};

export default SignupForm;
