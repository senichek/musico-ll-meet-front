import './style.scss';

import { Link } from 'react-router-dom';

const HomeMusicos = () => {
    return (
        <div className='home-page'>
            <Link to={'/momers'}>
                <div className='card'>
                    <h2 className='card__title'>MoMers</h2>
                    <img className='card__picture' src='https://images.pexels.com/photos/1601775/pexels-photo-1601775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='Musicos'></img>
                    <div className='card__info'>Consulte la liste des MoMers inscrits</div>
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

export default HomeMusicos;