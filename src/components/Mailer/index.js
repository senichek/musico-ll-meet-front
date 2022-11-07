import './style.scss';
import ControlledInput from '../controlledInput';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { API_BASE_URL } from "../../constants";
import { toast } from 'react-toastify';
import axios from 'axios';

const Mailer = ({ url, redirectionUrl }) => {

    const [inputName, setInputName] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputMessage, setInputMessage] = useState("");


    const jwt = useSelector((state) => state.user.token);
    const navigate = useNavigate();

    const onInputChange = (event) => {
        //dispatch(changeInputValue(event.target.name, event.target.value));
        switch (event.target.name) {
        case 'name':
            setInputName(event.target.value);
            break;
        case 'email':
            setInputEmail(event.target.value);
            break;
        case 'textEmail':
            setInputMessage(event.target.value);
            break;
        default:
            console.log(`No inputs in sign-up`);
        }
    };

    const handleMailerSubmit = async (event) => {
        debugger
        event.preventDefault();
        try {
            const body = {
                name: inputName,
                email: inputEmail,
                textEmail: inputMessage
            };

            const dbResponse = await axios.post(`${API_BASE_URL}${url}`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`
                }
            }
            );
            console.log("Mailer dbResponse >>>", dbResponse);
            if (dbResponse.status === 200) {
                toast.success('Ton message a bien été envoyé', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                return navigate(redirectionUrl);
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className='contact'>
            <form onSubmit={handleMailerSubmit}>
                <div className='contact__header'>
                    <div className='contact__header__field'>
                        Ton nom
                        <ControlledInput
                            type='text'
                            required
                            inputValue={inputName}
                            setInputValue={onInputChange}
                            placeholder='nom...'
                            name='name'
                        />
                    </div>
                    <div className='contact__header__field'>
                        Ton email
                        <ControlledInput
                            type='email'
                            required
                            inputValue={inputEmail}
                            setInputValue={onInputChange}
                            placeholder='email'
                            name='email'
                        />
                    </div>
                </div>    
                <div className='contact__message'>
                    <textarea
                        type='text'
                        required
                        value={inputMessage}
                        onChange={onInputChange}
                        placeholder='ton message...'
                        name='textEmail'
                    />
                </div>
                <div>
                    <Link to={`${redirectionUrl}`}>
                        <button className="button">Retour</button>
                    </Link>
                    <button
                        className='button'
                        type='submit'
                    >Envoyer</button>
                </div>
            </form>
        </div>
    )
}

export default Mailer