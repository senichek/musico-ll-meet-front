import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../constants";
import "./style.scss";
import Mailer from "../Mailer";

const MusicosDetails = () => {

    // adId will be received from browser's URL
    let { musicoId } = useParams();

    const [musico, setMusico] = useState(null);
    const [showMailer, setShowMailer] = useState(false);

    const jwt = useSelector((state) => state.user.token);

    const fetchData = async () => {
        if (!jwt) {
            return;
        }
        try {
            const { data } = await axios.get(`${API_BASE_URL}/musicos/${musicoId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            }
            );
            setMusico(data);
            console.log("Musico details >>>", data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const getMusico = async () => {
            await fetchData();
        };
        getMusico();
    }, []);

    const handleContact = () => {
        setShowMailer(true);
    };

    return (
        <div>
            {musico && (
                <div>
                    <div className={"details"} id={musico.id} style={{backgroundImage: `url("${musico.picture_url}")`}}>
                        <div className="details__poster">
                            <div className="details__name"><h2>{musico.name}</h2></div>
                            <img className="details__picture" src={musico.picture_url} alt="musico_img" />
                        </div>
                        <div className="details__infos">
                            <div className="details__type"><strong>Genres : </strong>{musico.musical_type.join(", ")}</div>
                            <div className="details__county"><strong>Département : </strong>{musico.county}</div>
                            <div className="details__city"><strong>Ville : </strong>{musico.city}</div>
                            <div className="details__responsable"><strong>Responsable : </strong>{musico.momer_to_contact}</div>
                            <div className="details__phone"><strong>Téléphone : </strong>{musico.phone}</div>
                            <div className="details__description">{musico.description}</div>
                            <div className="details__extLink"><a href={musico.external_link} target="_blank" >{musico.external_link}</a></div>
                        </div>
                    </div>
                    <div className="details__actions">
                        <Link to="/musicos">
                            <button className="button">Retour</button>
                        </Link>
                        <button className="button" onClick={handleContact}>Contact</button>
                    </div>
                    {showMailer && (
                        <Mailer url={`/musicos/${musicoId}`} redirectionUrl={`/musicos`} />
                    )}
                </div>
            )}
        </div>
    );
};

export default MusicosDetails;
