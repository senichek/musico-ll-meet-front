import PendingApplication from "../pendingApplication";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../constants";
import './style.scss';

// List of annonces a musico applied for (liste des annonces ou musico s'est postulé).
const PendingApplicationList = () => {

    const [annonces, setAnnonces] = useState([]);

    console.log("API Base URL >>>", API_BASE_URL);

    const jwt = useSelector((state) => state.user.token);
    const loggedInUserId = useSelector((state) => state.user.id);
    const userName = useSelector((state) => state.user.name);
    
    console.log("PendingApplicationList component jwt >>>", jwt);

    const headers = {
        Authorization: `Bearer ${jwt}`,
    };

    const fetchData = async () => {
        if (!jwt) {
            return;
        }
        try {
            const { data } = await axios.get(`${API_BASE_URL}/myapplications`, { headers });
            // Show only those pending applications (candidatures) which have not been published yet
            // Once annonce is published (once annonce has turned into an event) you cannot be candidate
            // to this annonce.
            const notYetPublic = data.filter(el => (el.is_published === false && el.is_archived === false));
            setAnnonces(notYetPublic);
            console.log("Annonces ou Musico s'est postulé >>>", data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const getAnnonces = async () => {
            await fetchData();
        };
        getAnnonces();
    }, [jwt]);

    // applications prop - inside annonces there is a collection of all the groups who have applied.
    // In this collection we have to find the currently logged-in Musico and show the status
    // of his application. The status is "found" inside the "PendingApplication" component.
    return (
        <>
            <h2 className="title-page">Voici tes candidatures {userName}</h2>
            {annonces.length === 0 && 
            (   <div className="pending-application-list">
                <div className="pending-application-list__empty">Vous n'avez pas de candidatures</div>
            </div>
            )}

            {annonces.length > 0 && 
                (
                    <div className="pending-application-list">
                        {annonces.map((annonce) => (
                            <>
                                <PendingApplication
                                    key={annonce.id}
                                    id={annonce.id}
                                    date={annonce.event_date.substring(0, 10)}
                                    city={annonce.address}
                                    title={annonce.name}
                                    img={annonce.picture_url}
                                    description={annonce.description}
                                    loggedInUserId={loggedInUserId}
                                    status={annonce.status_name}
                                />
                            </>
                        ))}
                    </div>
                )
            }
            
        </>
        
    );
};

export default PendingApplicationList;
