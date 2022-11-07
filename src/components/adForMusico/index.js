import PropTypes from 'prop-types';
import './style.scss';
import { Link } from "react-router-dom";
import { dateFormatter } from '../../utils/dateFormatter';

// Annonce created by Momer for Musicos to apply for (postuler)
const AdForMusico = ({ id, name, description, pictureUrl, address, county, eventDate, externalLink, eventType }) => {

    return (
        <article className='ad-for-musicos'>
            <Link to={`/annonces/${id}`}>
                <div className={`ad-for-musicos-${id}`}>
                    <div className="ad-for-musicos__date">{dateFormatter(eventDate)}</div>
                    {/*<div className="event__address">{address}</div>*/}
                    <div className="ad-for-musicos__name"><h2>{name}</h2></div>
                    <img className="ad-for-musicos__picture" src={pictureUrl} alt="ad_img" />
                    <div className="ad-for-musicos__type">{eventType}</div>
                    {/*<div className="event__description">{description}</div>*/}
                    <div className="ad-for-musicos__county">{county}</div>
                    {/*<div className="event__extLink">{externalLink}</div>*/}
                </div>
            </Link>
        </article>
    )
}

Event.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    pictureUrl: PropTypes.string,
    address: PropTypes.string,
    county: PropTypes.string,
    eventDate: PropTypes.string,
    externalLink: PropTypes.string,
    eventType: PropTypes.string,
};

export default AdForMusico;