import './style.scss'
import { NavLink } from "react-router-dom";
import { useEffect, useState } from 'react';
import Login from '../Login';
import MyAccount from './MyAccount';

const Navbar = () => {

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    // If there is JWT token it means that the user has been logged in.
    let token;
    let role;

    if (loggedInUser) {
        token = loggedInUser.token;
        role = loggedInUser.role;
    };

    const [toggleMenu, setToggleMenu] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    const toggleNavSmallScreen = () => {
        setToggleMenu(!toggleMenu);
    }

    useEffect(() => {
        const changeWidth = () => {
            setScreenWidth(window.innerWidth);
        }

        window.addEventListener('resize', changeWidth);
        return () => {
            window.removeEventListener('resize', changeWidth);
        }
    }, [])

    return (
        <div>
            <nav className='header-nav'>
                {(toggleMenu || screenWidth > 768) && (
                    <ul className='header-nav-links'>
                        <div className='header-nav-links__closeMenu'>
                            <button className='header-nav-links__closeMenu__btn' onClick={toggleNavSmallScreen}>+</button>
                        </div>
                        <li className='header-nav-links-name' onClick={toggleNavSmallScreen}>
                            <NavLink to="/events">Events</NavLink>
                        </li>
                        {token &&
                            <li className='header-nav-links-name' onClick={toggleNavSmallScreen}>
                                <NavLink to="/annonces">Annonces</NavLink>
                            </li>}
                        <li>
                            {token &&
                            <div>
                                {(role === 'momer') &&
                                <li className='header-nav-links-name' onClick={toggleNavSmallScreen}>
                                    <NavLink to="/musicos">Musicos</NavLink>
                                </li>}
                            </div>}
                            {token &&
                            <div>
                                {(role === 'musicos') &&
                                <li className='header-nav-links-name' onClick={toggleNavSmallScreen}>
                                    <NavLink to="/momers">Momers</NavLink>
                                </li>}
                            </div>}
                        </li>
                        
                        <div className='header-nav-account'>
                            {token &&
                            <MyAccount />}
                        </div>
                        <div className='header-nav-log'>
                            {!token &&
                                <Login />
                            }
                        </div>
                    </ul>
                )}
                <button onClick={toggleNavSmallScreen} className='header-nav-burger'>
                    <span className='header-nav-burger-bar'></span>
                </button>
            </nav>
        </div>
    )

};

export default Navbar;