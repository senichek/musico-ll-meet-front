import { useSelector } from "react-redux";
import AdForMusico from "../adForMusico";
import FilterEvents from "../filterEvents";
import './style.scss';
import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../constants";

const AdsListForMusicos = () => {

    const [annonces, setAnnonces] = useState([]);

    console.log("API Base URL >>>", API_BASE_URL);

    const jwt = useSelector((state) => state.user.token);
    console.log("List of annonces for Musicos jwt >>>", jwt);

    const headers = {
        Authorization: `Bearer ${jwt}`,
    };

    const fetchData = async () => {
        if (!jwt) {
            return;
        }
        try {
            const { data } = await axios.get(`${API_BASE_URL}/ads`, { headers });
            setAnnonces(data);
            console.log("List of annonces for Musicos >>>", data);
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



    return (
        <div>
            <h2 className="title-page">Les Annonces</h2>
            <div className="ads-list-for-musicos">
                {/* Show only those which are not archived */}
                {annonces.map((annonce) => (!annonce.is_archived && 
                    <AdForMusico
                        key={annonce.id}
                        id={annonce.id}
                        name={annonce.name}
                        description={annonce.description}
                        pictureUrl={annonce.picture_url}
                        address={annonce.address}
                        county={annonce.county}
                        eventDate={annonce.event_date}
                        externalLink={annonce.external_link}
                        eventType={annonce.event_type}
                    />
                ))}
            </div>
        </div>
    );
};

export default AdsListForMusicos;
