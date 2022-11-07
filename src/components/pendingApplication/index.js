import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './style.scss';

// This is the annonce the musico applied for (l'annonce ou musico s'est postulé).
const PendingApplication = ({ id, date, title, img, status, loggedInUserId }) => {

    return (
        <div className="pending-application">
            <Link to={`/annonces/${id}`}>
                <div className="pending-application__header">
                    <div className="pending-application__date">{date}</div>
                    {/*<div className="pending-application__city">{city}</div>*/}
                </div>
                <div className="pending-application__title"><h2>{title}</h2></div>
                <img className="pending-application__picture" src={img} alt="annonce_img" />
            </Link>
            {/*<div className="pending-application__description">{description}</div>*/}
            <div className="pending-application__status">Statut</div>
            <div className="pending-application__status-name">{status}</div>
        </div>
    );
};

PendingApplication.propTypes = {
    date: PropTypes.string,
    city: PropTypes.string,
    title: PropTypes.string,
    img: PropTypes.string,
    applications: PropTypes.array,
    loggedInUserId: PropTypes.number,
};

export default PendingApplication;