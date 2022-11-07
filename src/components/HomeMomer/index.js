import './style.scss';

import { Link } from 'react-router-dom';

const HomeMomer = () => {
    return (
        <div className='home-page'>
            <Link to={'/musicos'}>
                <div className='card'>
                    <h2 className='card__title'>Musicos</h2>
                    <img className='card__picture' src='https://images.pexels.com/photos/1864637/pexels-photo-1864637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='Musicos'></img>
                    <div className='card__info'>Consulte la liste des Musicos inscrits</div>
                </div>
            </Link>
            <Link to={'/events'}>
                <div className='card'>
                    <h2 className='card__title'>Events</h2>
                    <img className='card__picture' src='https://images.pexels.com/photos/154147/pexels-photo-154147.jpeg' alt='Events'></img>
                    <div className='card__info'>Retrouve tous les événements publics à venir</div>
                </div>
            </Link>
            <Link to={'/annonces'}>
                <div className='card'>
                    <h2 className='card__title'>Annonces</h2>
                    <img className='card__picture' src='https://images.pexels.com/photos/2674271/pexels-photo-2674271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='Annonces'></img>
                    <div className='card__info'>Jette un œil à toutes les annonces en cours</div>
                </div>
            </Link>
        </div>
    )
}

export default HomeMomer;