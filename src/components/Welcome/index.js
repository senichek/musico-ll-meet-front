import './style.scss';

import { Link } from 'react-router-dom';

import Login from '../Login';

const Welcome = () => {
    return(
        <div className='welcome'>
            <div className='Welcome_main'>
                <div className='welcome__intro'>
                    <div className='welcome__intro__title'>
                        <h2>Bienvenue</h2>
                        <h2>sur</h2>
                        <h2>MusicO'll Meet</h2>
                        <p>(<strong>M.O.M</strong> pour les intimes)</p>
                    </div>
                    <div className='welcome__intro__text'>
                        <p>C'est une plateforme qui a pour ambition de favoriser l'organisation d'événements musicaux, en facilitant la mise en relation des musiciens ou groupes (les Musicos) et les organisateurs (les MoMers).</p>
                        <p>Comme un concert sans public n'a aucun sens, tu peux aussi retrouver ici tous les Events près de chez toi ou en fonction de tes goûts musicaux.</p>
                    </div>
                </div>
                <div className='welcome__events'>
                    <div className='welcome__events__infos'>
                        <h3>Events</h3>
                        <p>Consulte la liste de tous les événements publics organisés par les MoMers.</p>
                        <p>Tu peux affiner ta recherche en fonction du lieu, du genre musical ou encore par date.</p>
                    </div>
                    <Link to="/events" className='welcome__events__button'>Consulter la listes des Events</Link>
                </div>
            </div>
            <div className='welcome__type'>
                <div className='welcome__type__section'>
                    <div className='welcome__type__section__musicos'>
                        <div className='welcome__type__musicos'>
                            <h3>Musicos</h3>
                            <p>Tu es musicien ou le représentant d'un groupe ?</p>
                            <p>Tu peux consulter les annonces des MoMers et déposer une candidature</p>
                            <p>Il suffit d'être inscrit!</p>
                            <Login />
                        </div>
                    </div>
                </div>
                <div className='welcome__type__section'>
                    <div className='welcome__type__section__momers'>
                        <div className='welcome__type__momers'>
                            <h3>MoMers</h3>
                            <p>Tu souaihtes organiser un Event ? Que tu sois un Pro, représentant d'une Asso ou même particulier pour un concert privé, tu peux déposer une annonce ou encore consulter la liste des Musicos inscrits</p>
                            <p>Pour ça, on a un espace spécialement pour toi</p>
                            <Login />
                        </div>
                    </div>
                </div>    
            </div>
        </div>
    )
}

export default Welcome