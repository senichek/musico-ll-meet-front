import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../constants";
import "./style.scss";

const MomerDetails = () => {

    // adId will be received from browser's URL
    let { momerId } = useParams();

    const [momer, setMomer] = useState(null);

    const jwt = useSelector((state) => state.user.token);

    const fetchData = async () => {
        if (!jwt) {
            return;
        }
        try {
            const { data } = await axios.get(`${API_BASE_URL}/momers/${momerId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            }
            );
            setMomer(data);
            console.log("Momer details >>>", data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const getMomer = async () => {
            await fetchData();
        };
        getMomer();
    }, []);

    const handleContact = () => {
        alert("Contact!");
    };

    return (
        <div>
            {momer && (
                <div>
                    <div className={"details"} id={momer.id} style={{backgroundImage: `url("${momer.picture_url}")`}}>
                        <div className="details__poster">
                            <div className="details__name"><h2>{momer.name}</h2></div>
                            <img className="details__picture" src={momer.picture_url} alt="momer_img" />
                        </div>
                        <div className="details__infos">
                            <div className="details__type"><strong>Type : </strong>{momer.momer_type}</div>
                            <div className="details__county"><strong>Département : </strong>{momer.county}</div>
                            <div className="details__city"><strong>Ville : </strong>{momer.city}</div>
                            <div className="details__description">{momer.description}</div>
                            <div className="details__extLink"><a href={momer.external_link} target="_blank">{momer.external_link}</a></div>
                        </div>
                    </div>    
                    <div className="details__actions">
                        <Link to="/momers">
                            <button className="button">Retour</button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MomerDetails;
