import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../constants";
import Musicos from "../musicos";
import './style.scss';
import FilterMusicos from "../filterMusicos";

const MusicosList = () => {
    const [musicos, setMusicos] = useState([]);
    const [urlParams, setUrlParams] = useState("");

    console.log("API Base URL >>>", API_BASE_URL);

    const jwt = useSelector((state) => state.user.token);
    console.log("MusicosList jwt >>>", jwt);

    const headers = {
        Authorization: `Bearer ${jwt}`,
    };

    const fetchData = async () => {
        if (!jwt) {
            return;
        }
        try {
            // url params are received from filter. If they are present
            // we'll receive the filtered list from the server.
            console.log("Full URL >>>", `${API_BASE_URL}/musicos${urlParams}`);
            const { data } = await axios.get(`${API_BASE_URL}/musicos${urlParams}`, { headers });
            debugger
            setMusicos(data);
            console.log("List of Musicos >>>", data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const getMusicos = async () => {
            await fetchData();
        };
        getMusicos();
    }, [jwt, urlParams]);

    return (
        <div>
            <h2 className="title-page">Liste des Musicos</h2>
            <FilterMusicos setFinalUrl={setUrlParams} />
            <div className="musicos-list">
                {musicos.map((mus) => (
                    <Musicos
                        key={mus.id}
                        id={mus.id}
                        name={mus.name}
                        genres={mus.musical_type.join(", ")}
                        pictureUrl={mus.picture_url}
                        city={mus.city}
                        county={mus.county}
                    />
                ))}
            </div>
        </div>
    );
};

export default MusicosList;
