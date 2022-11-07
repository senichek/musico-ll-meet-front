import { useEffect, useState } from "react";
import Modal from 'react-modal';
import './style.scss';
import PersonalProfileForm from '../personalProfileForm';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { API_BASE_URL } from "../../constants";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../../store/actions";
import musicalGenres from '../../data/genres.json';
import Upload from "../Upload";

const PersonalProfile = () => {
    // Get the user from DB and store it here
    const [user, setUser] = useState([]);
    // Tracking if there was an update. If "yes" -> re-render the page
    const [showDeletionDialogue, setShowDeletionDialogue] = useState(false);
    const [uploadedImage, setUploadedImage] = useState();
    const [profileUpdated, setProfileUpdated] = useState(false);

    const jwt = useSelector((state) => state.user.token);
    const role = useSelector((state) => state.user.role);
    // Use it for redirect
    let navigate = useNavigate();
    console.log("Personal profile jwt >>>", jwt);
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };

    const fetchData = async () => {
        if (!jwt) {
            return;
        }
        try {
            const { data } = await axios.get(`${API_BASE_URL}/profile`, { headers });
            // If a property is null/undefined use an empty string to avoid
            // errors in the console
            for (const prop in data) {
                if (!data[prop]) {
                    data[prop] = "";
                }
            }
            // Convert genres received from DB into options for dropDown to pre-fill
            // the dropDown by user's data. From DB we receive only genre names, and for
            // dropdown we need objects like {value: gnr, label: gnr, id: }
            if (data.musical_type) {
                const genreOptions = [];
                for (const gnr of data.musical_type) {
                    // find id of the genre in our hardcoded catalogue (folder "data");
                    for (const el of musicalGenres) {
                        if (gnr === el.name) {
                            genreOptions.push({value: gnr, label: gnr, id: el.id});
                        }
                    }
                };
                data.genres = genreOptions;
            };
            // Save the data to the local state of this component
            setUser(data);
            console.log("User Profile >>>", data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        const getUser = async () => {
            await fetchData();
        };
        getUser();
    }, [jwt, profileUpdated]); // if there is a JWT or profile was updated  -> we re-fetch
    // the data from DB and re-render the page.

    // as soon as we have the picture from Upload, we need to update the user in our DB
    const updateUserPicture = async () => {
        // "updateUserPicture" is triggerred by useEffect. 
        // UseEffect (even the one with a dependancy) will run upon initial render.
        // We can skip it like this:
        if (!uploadedImage) {
            return;
        };

        let toUpdate;

        if (user.role === 'musicos') {
            // if it's musico include the styles (genres) otherwise it will crash
            // on the server.

            // Genres have to be converted into an array with genre ids, for example [1, 5, 3] etc.
            const genresIds = [];
            for (const gnr of musicalGenres) {
                for (const el of user.musical_type) {
                    if (gnr.name === el) {
                        genresIds.push(gnr.id);
                    };
                };
            };

            toUpdate = {
                name: user.name,
                picture_url: uploadedImage,
                city: user.city,
                email: user.email,
                county: user.county,
                role: 'musicos',
                musical_type: genresIds
            }

            /* toUpdate = {
                picture_url: uploadedImage,
                musical_type: genresIds
            } */
        } else {
            toUpdate = {
                name: user.name,
                picture_url: uploadedImage,
                city: user.city,
                email: user.email,
                county: user.county,
                role: 'momer'
            };
        }
        try {
            const dbResponse = await axios.patch(`${API_BASE_URL}/profile`, toUpdate, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`
                }
            }
            );
            console.log("Update user avatar dbResponse >>>", dbResponse);
            // If the image has been updated we trigger re-render by updating the state
            setUser({...user, picture_url: dbResponse.data.savedUser.picture_url});
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const updateAvatar = async () => {
            await updateUserPicture();
        };
        updateAvatar();
    }, [uploadedImage]);

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
    const desinscrire = () => {
        setShowDeletionDialogue(true);
    };
    const dispatch = useDispatch();
    const confirmDesinscrire = async () => {
        try {
            const body = {
                "id": user.id
            };
            const dbResponse = await axios.delete(`${API_BASE_URL}/profile`, {body, headers});
            console.log("Account deletion db response >>>", dbResponse);
            if (dbResponse.status === 204) {
                console.log(`The user with id ${user.id} has been deleted.`);
                // Remove the user from localStorage and from the State
                localStorage.removeItem("loggedInUser");
                const resetUser = {
                    logged: false,
                    name: '',
                    id: '',
                    email: '',
                    password: '',
                    token: '',
                    role: '',
                };
                dispatch(logout(resetUser));
                return navigate('/signup');
            }
        } catch (error) {
            console.log(error);
        }
        setShowDeletionDialogue(false);
    };
    const customStyles = {
        content: {
            background: 'transparent',
            border: 'none',
        },
    };
    return (
        <>
            <div className="personal-profile">
                <div className="personal-profile__title"><h2>Mon profil</h2></div>
                <div className="personal-profile__identity">
                    <div>
                        <img className="personal-profile__picture__img" src={user.picture_url} alt="avatar_img" />
                        <Upload setImage={setUploadedImage} />
                    </div>
                    <div className="personal-profile__details-container">
                        <div className="personal-profile__part-one">
                            <p><span className = 'personal-profile__name'>Nom : </span>{user.name}</p>
                            <p><span className = 'personal-profile__name'>Nom du contact : </span>{user.momer_to_contact}</p>
                            <p><span className = 'personal-profile__name'>Email : </span>{user.email}</p>
                            <p><span className = 'personal-profile__name'>Téléphone :</span>{user.phone}</p>
                        </div>
                        <div className="personal-profile__part-two">
                            <p><span className = 'personal-profile__name'>Département : </span>{user.county}</p>
                            <p><span className = 'personal-profile__name'>Ville : </span>{user.city}</p>
                            <p><span className = 'personal-profile__name'>Adresse : </span>{user.address}</p>
                            {role === "musicos" &&
                            <>
                                {/* join noly if the styles (json_agg) are not null */}
                                <p><span className = 'personal-profile__name'>Genre musical : </span>{user.musical_type && (user.musical_type.join(", "))}</p>
                                <p><span className = 'personal-profile__name'>Nombres des musiciens: </span> {user.musicians_number}</p>
                            </>
                            }
                            {role === "momer" &&
                            <>
                                <p><span className = 'personal-profile__name'>Type : </span> {user.momer_type}</p>
                            </>
                            }
                        </div>
                    </div>
                </div>
                <div><a href={user.external_url} target="_blank">Ton lien : {user.external_url}</a></div>
                <div className="personal-profile__bio-title"><h3>Bio</h3></div>
                <div className="personal-profile__bio-text">{user.description}</div>
                <div className="personal-profile__action">
                    <button className="button" onClick={openModal}>Modifier</button>
                    <button className="button" onClick={desinscrire}>Me desinscrire</button>
                    {!jwt &&
                        <Link to="/"><button className="button">Retour à l'accueil</button></Link>}
                    {jwt &&
                    <div>
                        {(role === 'momer') &&
                        <Link to="/homemomer"><button className="button">Retour à l'accueil</button></Link>}
                        {(role === 'musicos') &&
                        <Link to="/homemusicos"><button className="button">Retour à l'accueil</button></Link>}
                    </div>}
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Mettre à jour votre profil"
            >
                {/* The form will be filled with the current user's values (info) */}
                <PersonalProfileForm
                    closeModal={() => setIsOpen(false)}
                    name={user.name}
                    pictureUrl={user.picture_url}
                    city={user.city}
                    email={user.email}
                    password="Mot de passe: Laissez vide si vous ne voulez pas le changer"
                    phone={user.phone}
                    address={user.address}
                    dept={user.county}
                    description={user.description}
                    musiciansNum={user.musicians_number}
                    groupLeader={user.momer_to_contact}
                    externalUrl={user.external_url}
                    responsable={user.momer_to_contact}
                    role={role}
                    genres={user.genres}
                    momerType={user.momer_type}
                    momerTypeId={user.momer_type_id}
                    setUpdated={setProfileUpdated}
                />
            </Modal>
            <Modal
                isOpen={showDeletionDialogue}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Supprimer le profil"
            >
                <p className="delete-account__text">The account will be deleted. It will be impossible to restore it. </p>
                <button className="delete-account__confirm-btn" onClick={confirmDesinscrire}>Confirm</button>
                <button className="delete-account__cancel-btn" onClick={() => setShowDeletionDialogue(false)}>Cancel</button>
            </Modal>
        </>
    );
};
export default PersonalProfile;
