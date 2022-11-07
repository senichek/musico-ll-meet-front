import { useState, useEffect } from "react";
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
import { dateFormatter } from "../../utils/dateFormatter";

const MyAdUpdateForm = ({ closeModal, annonceId, dept, city, pictureUrl, description, genres, name, type, date, externalUrl, setUpdated, address }) => {
    // Not sure if we'll need this state anywhere else
    // this is why it's not in store but here.
    const [inputName, setInputName] = useState(name);
    const [inputAddress, setInputAddress] = useState(address);
    const [inputDescription, setInputDescription] = useState(description);
    const [inputEventType, setInputEventType] = useState(type);
    const [inputExternalUrl, setInputExternalUrl] = useState(externalUrl);
    const [selectedDept, setSelectedDept] = useState([{value: dept, label: dept}]);
    const [selectedCity, setSelectedCity] = useState([{value: city, label: city}]);
    const [deptCodes, setDeptCodes] = useState([]);
    const [startDate, setStartDate] = useState(new Date(date));
    const [selectedGenre, setSelectedGenre] = useState([{value: genres, label: genres}]);

    const dispatch = useDispatch();

    useEffect(() => {
        // controls re-render of myAdDetails page
        setUpdated(false);
    }, []);

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
            console.log(`No inputs in update form`);
        }
    };

    const loggedInUser = useSelector((state) => state.user);

    const jwt = useSelector((state) => state.user.token);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log("Update annonce form submission");

        const annonceToUpdate = {
            name : inputName,
            description: inputDescription,
            owner_id: loggedInUser.id,
            city: selectedCity.value,
            county: selectedDept.value,
            address: inputAddress,
            event_date: startDate,
            external_link: inputExternalUrl,
            event_type: inputEventType,
            type_of_music_needed: selectedGenre.value
        }
        try {
            const dbResponse = await axios.patch(`${API_BASE_URL}/myads/${annonceId}`, annonceToUpdate, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`
                }
            }
            );
            console.log("Annonce update dbResponse >>>", dbResponse);
            // update global state
            dispatch(setSingleAd(dbResponse.data));
            // update state of the page "MyAdDetails"
            setUpdated(true);
        } catch (error) {
            console.log(error);
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
        <div className="update-annonce">
            <form className="update-annonce-form" onSubmit={handleFormSubmit}>
                <h1 className="update-annonce-form__title">Mettre à jour l'annonce</h1>
                <div className = 'field'><div className = 'field__name'>Département :</div><div className= 'fieldValue'><DeptsDropdown className="deps-select-form" selectedOption={selectedDept} setSelectedOption={setSelectedDept} onFocusOut={getDepartmentsCodes} isMulti={false} /></div></div>
                <div className = 'field'><div className = 'field__name'>Ville :</div><div className= 'fieldValue'><CitiesDropdown className="cities-select-form"  selectedOption={selectedCity} setSelectedOption={setSelectedCity} departmentCodes={deptCodes} isMulti={false} /></div></div>
                <div className = 'field'><div className = 'field__name'>Adresse :</div><div className= 'fieldValue'><ControlledInput type="text" required inputValue={inputAddress} setInputValue={onInputChange} placeHolder="Adresse..." name="address" /></div></div>
                <div className = 'field'><div className = 'field__name'>Description :</div><div className= 'fieldValue'><ControlledInput type="text" required inputValue={inputDescription} setInputValue={onInputChange} placeHolder="Description..." name="description" /></div></div>
                <div className = 'field'><div className = 'field__name'>Genre musical recherché :</div><div className= 'fieldValue'><GenreDropdown className="genre-select-form"  selectedOption={selectedGenre} setSelectedOption={setSelectedGenre} isMulti={false} /></div></div>
                <div className = 'field'><div className = 'field__name'>Nom :</div><div className= 'fieldValue'><ControlledInput className="input_field" type="text" required inputValue={inputName} setInputValue={onInputChange} placeHolder="Nom d'établissement" name="name" /></div></div>
                <div className = 'field'><div className = 'field__name'>Type d'event :</div><div className= 'fieldValue'><ControlledInput className="input_field" type="text" required inputValue={inputEventType} setInputValue={onInputChange} placeHolder="Type d'événement..." name="eventType" /></div></div>
                <div className = 'field'><div className = 'field__name'>Lien externe :</div><div className= 'fieldValue'><ControlledInput className="input_field" type="text" required inputValue={inputExternalUrl} setInputValue={onInputChange} placeHolder="External Url..." name="externalUrl" /></div></div>
                <div className = 'field'><div className = 'field__name'>Définir une date :</div><div className= 'fieldValue'><DatePicker selected={startDate} onChange={(date) => setStartDate(date)} dateFormat="dd-MM-yyyy" /></div></div>
                <div>
                    <button className='button' type="submit">Valider</button>
                    <button className='button' type="button" onClick={closeModal} >Annuler</button>
                </div>
            </form>
        </div>
    );
};

export default MyAdUpdateForm;
