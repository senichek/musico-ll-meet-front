import './style.scss';
import logo from '../../assets/logo.svg'
import { NavLink } from 'react-router-dom';

import Navbar from '../Navbar';

const Header = () => {

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    // If there is JWT token it means that the user has been logged in.
    let token;
    let role;

    if (loggedInUser) {
        token = loggedInUser.token;
        role = loggedInUser.role;
    };

    return (
        <header className='header'>
            <div className='header-logo'>
                {(!token) &&
                <NavLink to='/'>
                    <img className='header-logo-image' src={logo} alt='Logo MusicO ll Meet' />
                    <h1 className='header-logo-title'>M.O.M</h1>
                    <p className='header-logo-subtitle'>MusicO'll Meet</p>
                </NavLink>}
                {(role === 'momer') &&
                <NavLink to='/homemomer'>
                    <img className='header-logo-image' src={logo} alt='Logo MusicO ll Meet' />
                    <h1 className='header-logo-title'>M.O.M</h1>
                    <p className='header-logo-subtitle'>MusicO'll Meet</p>
                </NavLink>}
                {(role === 'musicos')&&
                <NavLink to='/homemusicos'>
                    <img className='header-logo-image' src={logo} alt='Logo MusicO ll Meet' />
                    <h1 className='header-logo-title'>M.O.M</h1>
                    <p className='header-logo-subtitle'>MusicO'll Meet</p>
                </NavLink>}
            </div>
            < Navbar /> 
        </header>
    )
};

export default Header;