import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../constants";
import Momer from "../momer";
import FilterMomers from "../filterMomers";
import './style.scss';

const MomerList = () => {
    const [momers, setMomers] = useState([]);
    const [urlParams, setUrlParams] = useState("");

    console.log("API Base URL >>>", API_BASE_URL);

    const jwt = useSelector((state) => state.user.token);
    console.log("MomerList jwt >>>", jwt);

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
            console.log("Full URL >>>", `${API_BASE_URL}/momers${urlParams}`);
            const { data } = await axios.get(`${API_BASE_URL}/momers${urlParams}`, { headers });
            setMomers(data);
            console.log("List of Momers >>>", data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const getMomers = async () => {
            await fetchData();
        };
        getMomers();
    }, [jwt, urlParams]);

    return (
        <div>
            <h2 className="title-page">Liste des MoMers</h2>
            <FilterMomers setFinalUrl={setUrlParams} />
            <div className="momers-list">
                {momers.map((momer) => (
                    <Momer
                        key={momer.id}
                        id={momer.id}
                        name={momer.name}
                        momerType={momer.momer_type}
                        pictureUrl={momer.picture_url}
                        city={momer.city}
                        county={momer.county}
                    />
                ))}
            </div>
        </div>
    );
};

export default MomerList;
