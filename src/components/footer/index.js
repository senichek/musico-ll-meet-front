import './style.scss';
import facebookLogo from '../../assets/icons/facebook-f-brands.svg';
import twitterLogo from '../../assets/icons/twitter-brands.svg';
import instagramLogo from '../../assets/icons/instagram-brands.svg';

import { Link, NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <ul className='footer__nav'>
                <li>© 2022 - MusicO'll Meet</li>
                <li>
                    <NavLink to={'/contact'}>Nous contacter</NavLink>
                </li>
                <li>
                    <NavLink to={'/about'}>A propos</NavLink>
                </li>
                <li className='footer__nav__link'>
                    <Link to={'#'}><img className='footer__nav__link__icon' src={facebookLogo} alt='Facebook'></img></Link>
                </li>
                <li className='footer__nav__link'>
                    <Link to={'#'}><img className='footer__nav__link__icon' src={twitterLogo} alt='Twitter'></img></Link>
                </li>
                <li className='footer__nav__link'>
                    <Link to={'#'}><img className='footer__nav__link__icon' src={instagramLogo} alt='Instagram'></img></Link>
                </li>
            </ul>
        </footer>
    )
}

export default Footer;