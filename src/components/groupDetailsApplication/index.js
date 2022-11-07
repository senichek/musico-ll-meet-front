import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from "axios";
import { API_BASE_URL } from "../../constants";
import { toast } from 'react-toastify';
import './style.scss';
import Mailer from '../Mailer';
import { Link } from 'react-router-dom';

// Confirmer or refuser la groupe
const GroupDetailsApplication = () => {

    // musicoID will be received from browser's URL
    let {annonceId, musicoID} = useParams();

    // In this case user = musico
    const jwt = useSelector((state) => state.user.token);
    const loggedInUser = useSelector((state) => state.user);

    const [musico, setMusico] = useState();
    const [annonce, setAnnonce] = useState();
    const [status, setStatus] = useState();
    const [showMailer, setShowMailer] = useState(false);
    const [applicationId, setApplicationId] = useState();
    const [showModify, setShowModify] = useState(false);
    

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
    };

    const fetchData = async () => {
        if (!jwt) {
            return;
        }
        try {
            const { data } = await axios.get(`${API_BASE_URL}/musicos/${musicoID}`, { headers });
            console.log("GroupDetailsApplication Component >>>", data);
            setMusico(data);
        } catch (error) {
            console.log(error);
        }
    };

    // We need this data to get the application_id which is storred inside annonce
    //https://musicollmeet.herokuapp.com/api/myads/19
    const fetchAnnonceData = async () => {
        if (!jwt) {
            return;
        }
        try {
            const { data } = await axios.get(`${API_BASE_URL}/myads/${annonceId}`, { headers });
            console.log(`Response of /myads/${annonceId}`, data);
            setAnnonce(data);
            // Check if the group has already been refused or confirmed
            setStatus(getCurrentStatus(data));
            if (status !== 'En attente') {
                setShowModify(true);
            } else {
                setShowModify(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const getMusico = async () => {
            await fetchData();
        };

        const getAnnonce = async () => {
            await fetchAnnonceData();
        }
        getMusico();
        getAnnonce();
    }, [status]);

    const contactGroup = () => {
        setApplicationId(getApplicationID());
        // Contact by email
        setShowMailer(true);
    };

    const getApplicationID = () => {
        // Among the groups who have applied for this annonce find the one who
        // you "consult" (who's details you see to make your decision to accep it or
        // refuse it). And then you can obtain the application ID of that group.
        const group = annonce.groups.find(el => el.userId === +musicoID);
        const applicationId = group.applicationId;
        return applicationId;
    };

    const getCurrentStatus = (data) => {
        const group = data.groups.find(el => el.userId === +musicoID);
        const status = group.status;
        return status;
    };

    const acceptGroup = async () => {
        const applicationId = getApplicationID();

        const body =  {
            candidate_status_id: 3
        };

        try {
            const { data } = await axios.patch(`${API_BASE_URL}/myads/${annonceId}/${applicationId}`, body, { headers });
            console.log("GroupDetailsApplication >>>", data);

            toast.success('Le groupe a été accepté', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            // We will only show status when the page loads.
            setStatus(null);
            setShowModify(!showModify);

        } catch (error) {
            console.log(error);

            toast.error('ERROR', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    const refuseGroup = async () => {
        const applicationId = getApplicationID();

        const body =  {
            candidate_status_id: 2
        };

        try {
            const { data } = await axios.patch(`${API_BASE_URL}/myads/${annonceId}/${applicationId}`, body, { headers });
            console.log("GroupDetailsApplication >>>", data);

            toast.warning('Le groupe a été refusé', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            // We will only show status when the page loads.
            setStatus(null);
            setShowModify(!showModify);

        } catch (error) {
            console.log(error);

            toast.error('ERROR', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    const toggleButtonPanelView = () => {
        setShowModify(!showModify);
    };
 
    return (
        <div>
            {musico && (
                <div>
                    <div className="details" style={{backgroundImage: `url("${musico.picture_url}")`}}>
                        <div className='details__poster'>
                            <div className="details__name"><h2>{musico.name}</h2></div>
                            <img className="details__picture" src={musico.picture_url} alt="group_img" />
                        </div>
                        <div className="details__infos">
                            <div className="details__type"><strong>Genres : </strong>{musico.musical_type.join(", ")}</div>
                            <div className="details__county"><strong>Département : </strong>{musico.county}</div>
                            <div className="details__city"><strong>Ville : </strong>{musico.city}</div>
                            <div className="details__responsable"><strong>Responsable : </strong>{musico.momer_to_contact}</div>
                            <div className="details__phone"><strong>Téléphone : </strong>{musico.phone}</div>
                            <div className="details__description"><strong>Details : </strong>{musico.description}</div>
                            <div className="details__extLink"><strong>Liens : </strong><a href={musico.external_link} target="_blank">{musico.external_link}</a></div>
                        </div>
                    </div>
                    <div className="details__actions">
                        {status && (
                            <p className={`details__candidate__status-${status}`}>Le statut actuel : {status}</p>
                        )}
                        <div className="group-details-application__actions__btn">
                            {showModify ?
                                <button className="button" onClick={toggleButtonPanelView}>Modify</button> :
                                <>
                                    <button className="button" onClick={acceptGroup}>Accepter</button>
                                    <button className="button" onClick={refuseGroup}>Refuser</button>
                                </>
                            }
                            <button className="button" onClick={contactGroup}>Contacter</button>
                            <Link to={`/candidates/${annonceId}`}>
                                <button className="button">Retour</button>
                            </Link>
                            {showMailer && (
                                <Mailer url={`/myads/${annonceId}/${applicationId}/contact`} redirectionUrl={`/candidates/${annonceId}`}  />
                            )}
                        </div>    
                    </div>
                </div>    
            )}
        </div>
    );
};

export default GroupDetailsApplication;
