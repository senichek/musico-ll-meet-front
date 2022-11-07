import PropTypes from 'prop-types';
import './style.scss';
import { Link } from "react-router-dom";
import { dateFormatter } from '../../utils/dateFormatter';

const MyAd = ({ id, name, description, pictureUrl, address, county, eventDate, externalLink, eventType, isArchived }) => {

    return (
        <article className="my-ad">
            <div className={`my-ad${isArchived && '__isArchived'}`}>
                <Link to={`/myannonces/${id}`}>
                    <div className={`my-ad-${id}`}>
                        <div className="my-ad__date">{dateFormatter(eventDate)}</div>
                        {/*<div className="event__address">{address}</div>*/}
                        <div className="my-ad__name"><h2>{name}</h2></div>
                        <img className="my-ad__picture" src={pictureUrl} alt="my-ad_img" />
                        <div className="my-ad__type">{eventType}</div>
                        {/*<div className="event__description">{description}</div>*/}
                        <div className="my-ad__county">{county}</div>
                        {/*<div className="event__extLink">{externalLink}</div>*/}
                        {isArchived && 
                        <div className="my-ad__archived">Archivée</div>
                        }
                    </div>
                </Link>
            </div>
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
    isArchived: PropTypes.bool
};

export default MyAd;