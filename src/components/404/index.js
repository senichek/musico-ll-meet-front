import './style.scss';
import picture404 from '../../assets/404.png'

import { Link } from 'react-router-dom';

const Page404 = () => {

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    // If there is JWT token it means that the user has been logged in.
    let token;
    let role;

    if (loggedInUser) {
        token = loggedInUser.token;
        role = loggedInUser.role;
    };

    return (
        <div className='page-404'>
            <div className='page-404__message'>
                <h2>Page introuvable</h2>
                <p>Avec nos Helpers préférés, tu n'es jamais perdu</p>
                {!token &&
                <Link to="/" className='returnButton'>Retour à l'accueil</Link>}
                {token &&
                <div>
                    {(role === 'momer') &&
                    <Link to="/homemomer" className='returnButton'>Retour à l'accueil</Link>}
                    {(role === 'musicos') &&
                    <Link to="/homemusicos" className='returnButton'>Retour à l'accueil</Link>}
                </div>}
            </div>
            <div className='page-404__picture'>
                <img src={picture404} alt='404'></img>
            </div>
        </div>    
    )
}

export default Page404