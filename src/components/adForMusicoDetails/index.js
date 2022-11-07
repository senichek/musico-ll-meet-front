import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../constants";
import { toast } from 'react-toastify';
import './style.scss';
import { dateFormatter } from '../../utils/dateFormatter';

// This is the "details" of the annonce created by Momer for Musicos (pour postuler)
const AdForMusicoDetails = () => {

    // annonceID will be received from browser's URL
    let { annonceId } = useParams();

    const [annonce, setAnnonce] = useState([]);

    const [alreadyApplied, setAlreadyApplied] = useState(false);

    const [applicationId, setApplicationId] = useState();

    console.log("API Base URL >>>", API_BASE_URL);

    const jwt = useSelector((state) => state.user.token);
    const loggedInUserId = useSelector((state) => state.user.id);
    const role = useSelector((state) => state.user.role);
    console.log("Annonce of Momer for Musicos jwt >>>", jwt);

    const headers = {
        Authorization: `Bearer ${jwt}`,
    };

    const fetchData = async () => {
        if (!jwt) {
            return;
        }
        try {
            const { data } = await axios.get(`${API_BASE_URL}/ads/${annonceId}`, { headers });
            setAnnonce(data);
            console.log("Annonce of Momer for Musicos >>>", data);
        } catch (error) {
            console.log(error);
        }
    };


    const getApplicationID = async () => {
        // Check if the user has already applied for this annonce.
        // If "yes", there will user_id (id of the logged-in user)
        // in the response of /myapplications
        if (!jwt) {
            return;
        }
        try {
            const { data } = await axios.get(`${API_BASE_URL}/myapplications`, { headers });

            for (const el of data) {
                if (el.id === annonce.id) {
                    setApplicationId(el.application_id);
                    setAlreadyApplied(true);
                }
            };

            console.log("Response of /myapplications >>>", data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const getAnnonce = async () => {
            await fetchData();
        };
        getAnnonce();
    }, []);

    useEffect(() => {
        const getIdofApplication = async () => {
            await getApplicationID();
        }
        getIdofApplication();
    }, [annonce]); // as soon as we have annonce we run the useEffect to get the ID of application


    const Postuler = async () => {
        const toApply = {
            event_id: +annonceId,
            users_id: loggedInUserId
        };
        try {
            const dbResponse = await axios.post(`${API_BASE_URL}/ads/${annonceId}`, toApply, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`
                }
            }
            );
            console.log("postuler dbResponse >>>", dbResponse);
            setApplicationId(dbResponse.data.id);
            if (dbResponse.data.candidate_status_id === 1) {
                toast.success('Vous avez postulé', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setAlreadyApplied(true);
            }
        } catch (error) {
            if (error.response.data.statusCode === 406) {
                toast.warning('Déjà postulé', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            console.log(error);
        }
    };

    const seRetirer = async () => {
        try {
            const dbResponse = await axios.delete(`${API_BASE_URL}/myapplications/${applicationId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`
                }
            }
            );
            setAlreadyApplied(false);
            console.log("Se retirer dbResponse >>>", dbResponse);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className="details" style={{backgroundImage: `url("${annonce.picture_url}")`}}>
                <div className="details__poster">
                    <div className="details__name"><h2>{annonce.name}</h2></div>
                    <img className="details__picture" src={annonce.picture_url} alt="ad_img" />
                </div>
                <div className="details__infos">
                    <p><strong>{dateFormatter(annonce.event_date)}</strong></p>
                    <p><strong>Type d'Event : </strong>{annonce.event_type}</p>
                    <p><strong>Genre musical recherché : </strong>{annonce.type_of_music_needed}</p>
                    <p>{annonce.description}</p>
                    <p><strong>{annonce.county}</strong></p>
                    <p><strong>Adresse : </strong>{annonce.address}</p>
                </div>
            </div>
            {/* Only musicos can apply (postuler) */}
            {role === 'musicos' && 
                (
                    <div className="details__actions">
                        {alreadyApplied ? 
                            <button className="button" onClick={seRetirer}>Se retirer</button> 
                            : 
                            <button className="button" onClick={Postuler}>postuler</button>}
                        <Link to="/annonces">
                            <button className="button">Retour</button>
                        </Link>
                    </div>
                )
            }
            {role === 'momer' &&
                (
                    <div className="details__actions">
                        <Link to="/annonces">
                            <button className="button">Retour</button>
                        </Link>
                    </div>
                )
            }
        </div>
    );
};

export default AdForMusicoDetails;