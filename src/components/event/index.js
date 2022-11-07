import PropTypes from 'prop-types';
import './style.scss';
import { Link } from "react-router-dom";
import { dateFormatter } from "../../utils/dateFormatter";

const Event = ({ id, name, description, pictureUrl, address, county, eventDate, externalLink, eventType }) => {

    return (
        <article className='event'>
            <Link to={`/events/${id}`}>
                <div className={`event-${id}`}>
                    <div className="event__date">{dateFormatter(eventDate)}</div>
                    {/*<div className="event__address">{address}</div>*/}
                    <div className="event__name"><h2>{name}</h2></div>
                    <img className="event__picture" src={pictureUrl} alt="event_img" />
                    <div className="event__type">{eventType}</div>
                    {/*<div className="event__description">{description}</div>*/}
                    <div className="event__county">{county}</div>
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

export default Event;