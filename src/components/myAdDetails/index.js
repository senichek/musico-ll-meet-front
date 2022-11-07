import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../constants";
import { toast } from 'react-toastify';
import "./style.scss";
import Modal from 'react-modal';
import MyAdUpdateForm from "../myAdUpdateForm";
import Upload from "../Upload";
import { dateFormatter } from "../../utils/dateFormatter";

const MyAdDetails = () => {
    // adId will be received from browser's URL
    let { annonceId } = useParams();

    const [hasBeenUpdated, setHasBeenUpdated] = useState(false);

    const jwt = useSelector((state) => state.user.token);

    // Find the ad we'd like to delete by its id (sign of "plus" converts string to INT)
    // and put it into local state. When the add gets updated in myAdUpdateForm
    // "setAdToShow" will be invoked to update its page. 
    const [adToShow, setAdToShow] = useState();

    const [uploadedImage, setUploadedImage] = useState();

    const navigate = useNavigate();

    // Fetch the data from DB
    const fetchData = async () => {
        try {
            const { data } = await axios.get(`${API_BASE_URL}/myads/${+annonceId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            }
            );
            console.log("My ad >>>", data);
            setAdToShow(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const getMyAds = async () => {
            await fetchData();
        };
        getMyAds();
    }, [jwt, hasBeenUpdated]);

    // If the image of the annonce has changed, update the annonce
    const updateAnnonceImg = async () => {
        // "updateAnnonceImg" is triggerred by useEffect. 
        // UseEffect (even the one with a dependancy) will run upon initial render.
        // We can skip it like this:
        if (!uploadedImage) {
            return;
        };
        const toUpdate = {
            picture_url: uploadedImage
        };

        try {
            const dbResponse = await axios.patch(`${API_BASE_URL}/myads/${annonceId}`, toUpdate, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`
                }
            }
            );
            console.log("Update annonce image dbResponse >>>", dbResponse);

            // If the image has been updated we trigger re-render by updating State
            setAdToShow({...adToShow, picture_url: dbResponse.data.picture_url});
        } catch (error) {
            console.log(error);
        };
    };

    useEffect(() => {
        const updateImg = async () => {
            await updateAnnonceImg();
        };
        updateImg();
    }, [uploadedImage]);


    const handleDelete = async () => {
        try {
            const dbResponse = await axios.delete(`${API_BASE_URL}/myads/${annonceId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            }
            );

            if (dbResponse.status === 200) {
                return navigate("/myannonces");
            }
        } catch (error) {
            console.log(error);
            toast.error(`Erreur. L'annonce n'a pas été supprimée.`, {
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

    // https://reactcommunity.org/react-modal/accessibility/
    Modal.setAppElement('#root');

    const [modalIsOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    }
    
    const afterOpenModal = () => {
        // references are now sync'd and can be accessed.
    }
    
    const closeModal = () => {
        setIsOpen(false);
    }

    const customStyles = {
        content: {
            background: 'transparent',
            border: 'none',
        },
    };

    return (
        <div>
            {adToShow && (
                <div>
                    <div className={"details"} id={adToShow.id} style={{backgroundImage: `url("${adToShow.picture_url}")`}}>
                        <div className="details__poster">
                            <div className="details__name"><h2>{adToShow.name}</h2></div>
                            <img className="details__picture" src={adToShow.picture_url} alt="event_img" />
                            <Upload setImage={setUploadedImage} />
                        </div>
                        <div className="details__infos">
                            <div className="details__date"><strong>{dateFormatter(adToShow.event_date.substring(0, 10))}</strong></div>
                            <div className="details__type"><strong>Type d'Event : </strong>{adToShow.event_type}</div>
                            <div className="details__genres"><strong>Genre musical recherché : </strong>{adToShow.type_of_music_needed}</div>
                            <div className="details__description">{adToShow.description}</div>
                            <div className="details__extLink"><a href={adToShow.external_link} target="_blank">{adToShow.external_link}</a></div>
                            <div className="details__county"><strong>{adToShow.county}</strong></div>
                            <div className="details__address"><strong>Adresse : </strong>{adToShow.address}</div>
                        </div>
                    </div>    
                    <div className="details__actions">
                        <Link to="/myannonces">
                            <button className="button">Retour</button>
                        </Link>
                        <button className="button" onClick={handleDelete}>Supprimer</button>
                        <button className="button" onClick={openModal}>Modifier</button>
                        <Link to={`/candidates/${adToShow.id}`}>
                            <button className="button">Details</button>
                        </Link>
                    </div>
                    
                    <Modal
                        isOpen={modalIsOpen}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Mettre à jour l'annonce"
                    >
                        {/* The form will be filled with the current user's values (info) */}
                        <MyAdUpdateForm
                            closeModal={() => setIsOpen(false)}
                            updateAdState={setAdToShow}
                            annonceId={adToShow.id}
                            dept={adToShow.county}
                            city={adToShow.address}
                            address={adToShow.address}
                            pictureUrl={adToShow.picture_url}
                            description={adToShow.description}
                            genres={adToShow.type_of_music_needed}
                            name={adToShow.name}
                            type={adToShow.event_type}
                            date={adToShow.event_date.substring(0, 10)}
                            setUpdated={setHasBeenUpdated}
                            externalUrl={adToShow.external_link}
                        />
                    </Modal>
                </div>
            )}
        </div>
    );
};

export default MyAdDetails;
