import { useState } from "react";
import DatePicker from "react-datepicker"; // https://www.npmjs.com/package/react-datepicker
import "react-datepicker/dist/react-datepicker.css";
import ControlledInput from "../controlledInput";
import DeptsDropdown from "../departementsDropdown";
import CitiesDropdown from "../citiesDropdown";
import GenreDropdown from "../genreDropdown";
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import { API_BASE_URL } from "../../constants";
import { setSingleAd } from "../../store/actions";
import './style.scss';
import Upload from "../Upload";
import { toast } from 'react-toastify';

const CreateAnnonceForm = ({ closeModal }) => {
    // Not sure if we'll need this state anywhere else
    // this is why it's not in store but here.
    const [inputName, setInputName] = useState("");
    const [inputDescription, setInputDescription] = useState("");
    const [inputAddress, setInputAddress] = useState("");
    const [inputEventType, setInputEventType] = useState("");
    const [inputExternalUrl, setInputExternalUrl] = useState("");
    const [selectedDept, setSelectedDept] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    const [deptCodes, setDeptCodes] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [selectedGenre, setSelectedGenre] = useState([]);
    const [uploadedImage, setUploadedImage] = useState();

    const dispatch = useDispatch();

    const onInputChange = (event) => {
        switch (event.target.name) {
        case 'description':
            setInputDescription(event.target.value);
            break;
        case 'name':
            setInputName(event.target.value);
            break;
        case 'address':
            setInputAddress(event.target.value);
            break;
        case 'eventType':
            setInputEventType(event.target.value);
            break;
        case 'externalUrl':
            setInputExternalUrl(event.target.value);
            break;
        default:
            console.log(`No inputs in sign-up`);
        }
    };

    const loggedInUser = useSelector((state) => state.user);

    const jwt = useSelector((state) => state.user.token);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log("Create annonce form submission");
        const annonceToCreate = {
            name : inputName,
            description: inputDescription,
            picture_url: uploadedImage,
            owner_id: loggedInUser.id,
            city: selectedCity.value,
            address: inputAddress,
            county: selectedDept.value,
            event_date: startDate,
            external_link: inputExternalUrl,
            event_type: inputEventType,
            type_of_music_needed: selectedGenre.value
        }
        try {
            const dbResponse = await axios.post(`${API_BASE_URL}/ads`, annonceToCreate, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`
                }
            }
            );
            console.log("Annonce creation dbResponse >>>", dbResponse);
            // update state
            dispatch(setSingleAd(dbResponse.data));
            toast.success(`L'annonce a été créée.`, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (error) {
            console.log(error);
            toast.error(`Erreur. ${error.response.data.message}`, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        closeModal(true);
    };

    // We need the departments codes to pick the cities from these departements, 
    // cause we cannot show the dropdown of 3500 cities, it's too slow.
    const getDepartmentsCodes = () => {
        // if we choose one department from the list it's going to be an object.
        // if we choose two and more - there is going to be an array.
        console.log(selectedDept);
        if (typeof selectedDept === 'object') {
            setDeptCodes([selectedDept.code]);
        } else {
            const codes = selectedDept.map(dept => (dept.code));
            setDeptCodes(codes);
        }
    }

    return (
        <div className="create-annonce">
            <form className="create-annonce-form" onSubmit={handleFormSubmit}>
                <h1 className="create-annonce-form__title">Nouvelle annonce</h1>
                <div className = 'field'><div className = 'field__name'>Département :</div><div className= 'fieldValue'><DeptsDropdown className="deps-select-form" selectedOption={selectedDept} setSelectedOption={setSelectedDept} onFocusOut={getDepartmentsCodes} isMulti={false} /></div></div>
                <div className = 'field'><div className = 'field__name'>Ville :</div><div className= 'fieldValue'><CitiesDropdown className="cities-select-form"  selectedOption={selectedCity} setSelectedOption={setSelectedCity} departmentCodes={deptCodes} isMulti={false} /></div></div>
                <div className = 'field'><div className = 'field__name'>Adresse :</div><div className= 'fieldValue'><ControlledInput type="text" required inputValue={inputAddress} setInputValue={onInputChange} placeHolder="Adresse..." name="address" /></div></div>
                <div className = 'field'><div className = 'field__name'><Upload setImage={setUploadedImage} /></div></div>
                <div className = 'field'><div className = 'field__name'>Description :</div><div className= 'fieldValue'><ControlledInput type="text" required inputValue={inputDescription} setInputValue={onInputChange} placeHolder="Description..." name="description" /></div></div>
                <div className = 'field'><div className = 'field__name'>genre musical recherché :</div><div className= 'fieldValue'><GenreDropdown className="genre-select-form"  selectedOption={selectedGenre} setSelectedOption={setSelectedGenre} isMulti={false} /></div></div>
                <div className = 'field'><div className = 'field__name'>Nom :</div><div className= 'fieldValue'><ControlledInput className="input_field" type="text" required inputValue={inputName} setInputValue={onInputChange} placeHolder="Nom d'établissement" name="name" /></div></div>
                <div className = 'field'><div className = 'field__name'>type d'event :</div><div className= 'fieldValue'><ControlledInput className="input_field" type="text" required inputValue={inputEventType} setInputValue={onInputChange} placeHolder="Type d'événement..." name="eventType" /></div></div>
                <div className = 'field'><div className = 'field__name'>Lien externe :</div><div className= 'fieldValue'><ControlledInput className="input_field" type="text" required inputValue={inputExternalUrl} setInputValue={onInputChange} placeHolder="External Url..." name="externalUrl" /></div></div>
                <div className='field'><div className = 'field__name'>Définir une date</div><div className= 'fieldValue'><DatePicker selected={startDate} onChange={(date) => setStartDate(date)} dateFormat="dd-MM-yyyy" /></div>
                </div>
                <div>
                    <button className='button' type="submit">Publier</button>
                    <button className='button' type="button" onClick={closeModal} >Annuler</button>     
                </div>
            </form>
        </div>
    );
};

export default CreateAnnonceForm;
