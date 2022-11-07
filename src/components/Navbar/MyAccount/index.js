import './style.scss'
import { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logout } from '../../../store/actions';

const MyAccount = () => {

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    let role;

    if (loggedInUser) {
        role = loggedInUser.role;
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem("loggedInUser");
        const resetUser = {
            logged: false,
            name: '',
            id: '',
            email: '',
            password: '',
            token: '',
            role: '',
        };
        dispatch(logout(resetUser));
        return navigate("/signin");
    };

    const [toggleAccount, setToggleAccount] = useState(false);
    const accountMenu = () => {
        setToggleAccount(!toggleAccount);
    }

    return(
        <div className='my-account'>
            <a className='my-account__btn' onClick={accountMenu}>Mon compte</a>
            {toggleAccount && (
                <ul className='my-account__list'>
                    <li className='my-account__list__item'>
                        <NavLink to="/profile" className='my-account__link' onClick={accountMenu}>Mon profil</NavLink>
                    </li>
                    <li className='my-account__list__item'>
                        <div className='my-account__list__item__role'>
                            {(role === 'momer') &&
                                <div>
                                    <NavLink to="/myannonces" className='my-account__link' onClick={accountMenu}>Mes annonces</NavLink>
                                </div>}
                            {(role === 'musicos') &&
                                <div>
                                    <NavLink to="/pendingapplications" className='my-account__link' onClick={accountMenu}>Mes candidatures</NavLink>
                                </div>}
                        </div>
                    </li>
                    <li className='my-account__list__item'>
                        {role === 'musicos' &&
                        <NavLink to="/myeventsmusicos" className='my-account__link' onClick={accountMenu}>Mes Events</NavLink>
                        }

                        {role === 'momer' &&
                        <NavLink to="/myeventsmomer" className='my-account__link' onClick={accountMenu}>Mes Events</NavLink>
                        }
                    </li>
                    <li className='my-account__list__item'>
                        <div>
                            <NavLink className='my-account__signout' to="/signin" onClick={handleLogout} >Se déconnecter</NavLink>
                        </div>
                    </li>    
                </ul>)}
        </div>
    )
}

export default MyAccount