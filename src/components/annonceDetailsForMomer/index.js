import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_BASE_URL } from "../../constants";
import { toast } from 'react-toastify';
import "./style.scss";
import { dateFormatter } from "../../utils/dateFormatter";

const AnnonceDetailsForMomer = () => {
    
    const {annonceId} = useParams();

    const [annonce, setAnnonce] = useState();

    const [isArchived, setIsArchived] = useState(false);

    console.log("API Base URL >>>", API_BASE_URL);

    const jwt = useSelector((state) => state.user.token);

    console.log("AnnonceDetailsForMomer >>>", jwt);

    const navigate = useNavigate();

    const headers = {
        'Content-type': 'application/json',
        Authorization: `Bearer ${jwt}`,
    };

    const fetchData = async () => {
        if (!jwt) {
            return;
        }
        try {
            const { data } = await axios.get(`${API_BASE_URL}/ads/${annonceId}`, { headers });
            setAnnonce(data);
            setIsArchived(data.is_archived);
            console.log("AnnonceDetailsForMomer >>>", data);
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

    const modifyAnnonce = (annonceId) => {
        alert(`You are modifying annonceID ${annonceId}`);
    };

    const publishAnnonce = async () => {
        //Check if there is anyone "En attente". You have to "confirm"
        //or "refuse" the candidates before publishing the event.
        // Also check if there are groups in general who want to participate.
        if (!annonce.groups || !annonce.groups[0].userId || annonce.groups.length === 0 ) {
            toast.info(`Pour publier l'annonce il faut qu'il y ait des groupes.`, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        for (const el of annonce.groups) {
            if (el.status === 'En attente') {
                toast.info('Veuillez confirmer ou refuser les candidats qui sont "En attente".', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                return;
            };
        };

        // If all the groups have been refused, you cannot publish the annonce
        const refused = [];
        for (const el of annonce.groups) {
            if (el.status === 'Refusée') {
                refused.push(el);
            };
        };
        if (refused.length === annonce.groups.length) {
            toast.info(`Pour publier l'annonce il faut qu'il y ait des groupes.`, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        };

        // Turn annonce into an event (publsih it, make it visible to everybody)
        if (!jwt) {
            return;
        }
        try {
            const body = {
                is_published: true
            };

            const dbResponse = await axios.patch(`${API_BASE_URL}/myads/${annonceId}`, body, { headers });
            console.log("Publish annonce dbResponse >>>", dbResponse);
            if (dbResponse.status === 200) {
                toast.success(`L'événement a été publié.`, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            };
            return navigate("/events");
        } catch (error) {
            console.log(error);
        }
    };

    const archiveAnnonce = async () => {
        if (!jwt) {
            return;
        }
        try {
            const body = {
                is_archived: true
            };

            const dbResponse = await axios.patch(`${API_BASE_URL}/myads/${annonceId}`, body, { headers });
            console.log("Archive annonce dbResponse >>>", dbResponse);
            if (dbResponse.status === 200) {
                toast.warning(`L'annonce a été archivée.`, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setIsArchived(true);
                //return navigate("/myannonces");
            };
        } catch (error) {
            console.log(error);
        }
    };

    const desarchiveAnnonce = async () => {
        if (!jwt) {
            return;
        }
        try {
            const body = {
                is_archived: false
            };

            const dbResponse = await axios.patch(`${API_BASE_URL}/myads/${annonceId}`, body, { headers });
            console.log("Desarchive annonce dbResponse >>>", dbResponse);
            if (dbResponse.status === 200) {
                toast.success(`L'annonce a été desarchivée.`, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setIsArchived(false);
            };
        } catch (error) {
            console.log(error);
        }
    };

    // annonce - this is the annonce (event) where Musico clicked "postuler".
    // Later it will come from API, now it's hardcoded.
    return (
        <>
            {annonce && (
                <div>
                    <div className="details" style={{backgroundImage: `url("${annonce.picture_url}")`}}>
                        <div className="details__poster">
                            <h2 className="details__name">{annonce.name}</h2>
                            <img className="details__picture" src={annonce.picture_url} alt="event_img" />
                        </div>
                        <div className="details__infos">
                            <p><strong>{dateFormatter(annonce.event_date.substring(0, 10))}</strong></p>
                            <p>{annonce.description}</p>
                            <div className="">
                                {annonce.groups.map((cand) => (
                                    <>
                                        {cand.userId && (
                                            <div className="details__candidate" key={`cand.id-${cand.userId}`}>
                                                <div className="details__candidate__infos">
                                                    <p><strong>{cand.group_name}</strong></p>
                                                    <p className={`details__candidate__status-${cand.status.substring(0, 3)}`}>{cand.status}</p>
                                                </div>
                                                <Link to={`/application/${annonceId}/${cand.userId}`}>
                                                    <button className="button">Consulter</button>
                                                </Link>
                                            </div>
                                        )}
                                    </>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="details__actions">
                        {isArchived ?
                            (
                                <>
                                    <Link to={`/myannonces/${annonceId}`}>
                                        <button className="button">Retour</button>
                                    </Link>
                                    <button className="button" onClick={desarchiveAnnonce}>Désarchiver</button>
                                </>
                            )
                            : 
                            (
                                <>
                                    <Link to={`/myannonces/${annonceId}`}>
                                        <button className="button">Retour</button>
                                    </Link>
                                    <button className="button" onClick={publishAnnonce}>Publier dans Events</button>
                                    <button className="button" onClick={archiveAnnonce}>Archiver</button>
                                </>
                            )}
                    </div>
                </div>
            )}
        </>
    )
}

export default AnnonceDetailsForMomer;
