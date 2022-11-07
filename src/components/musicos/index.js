import PropTypes from 'prop-types';
import './style.scss';
import { Link } from "react-router-dom";

const Musicos = ({ id, name, genres, pictureUrl, city, county }) => {

    return (
        <article className='musicos'>
            <Link to={`/musicos/${id}`}>
                <div className={`musicos-${id}`}>
                    <div className="musicos__genres">{genres}</div>
                    <h1 className="musicos__name">{name}</h1>
                    <img className="musicos__picture" src={pictureUrl} alt="musicos_img" />
                    <div className="musicos__city">{city}</div>
                    <div className="musicos__county">{county}</div>
                </div>
            </Link>
        </article>
    )
}

Event.propTypes = {
    id: PropTypes.number,
    genres: PropTypes.string,
    name: PropTypes.string,
    pictureUrl: PropTypes.string,
    county: PropTypes.string,
    city: PropTypes.string
};

export default Musicos;