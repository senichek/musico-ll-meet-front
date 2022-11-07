import PropTypes from 'prop-types';
import './style.scss';
import { Link } from "react-router-dom";

const Momer = ({ id, name, pictureUrl, city, county, momerType }) => {
    return (
        <article className='momer'>
            <Link to={`/momers/${id}`}>
                <div className={`momer-${id}`}>
                    <div className="momer__type">{momerType}</div>
                    <div className="momer__name"><h1>{name}</h1></div>
                    <img className="momer__picture" src={pictureUrl} alt="momer_img" />
                    <div className="momer__city">{city}</div>
                    <div className="momer__county">{county}</div>
                </div>
            </Link>
        </article>
    )
}

Event.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    pictureUrl: PropTypes.string,
    address: PropTypes.string,
    county: PropTypes.string
};

export default Momer;