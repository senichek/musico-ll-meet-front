import { useState, useEffect } from "react";
import ControlledInput from "../controlledInput";
import DeptsDropdown from "../departementsDropdown";
import CitiesDropdown from "../citiesDropdown";
import { toast } from 'react-toastify';
import MomerTypeDropdown from "../momerTypeDropdown";
import GenreDropdown from "../genreDropdown";
import { useSelector } from 'react-redux';
import axios from "axios";
import { API_BASE_URL } from "../../constants";
import './style.scss';

const PersonalProfileForm = ({ closeModal, name, pictureUrl, city, email, 
    password, phone, address, dept, description, musiciansNum, 
    externalUrl, responsable, momerType, momerTypeId, role, genres, setUpdated }) => {
    // Not sure if we'll need this state anywhere else
    // this is why it's not in store but here.
    const [inputName, setInputName] = useState(name);
    const [inputEmail, setInputEmail] = useState(email);
    const [inputPassword, setInputPassword] = useState(password);
    const [inputImgUrl, setInputImgUrl] = useState(pictureUrl);
    const [inputAddress, setInputAddress] = useState(address);
    const [inputPhone, setInputPhone] = useState(phone);
    const [inputDescription, setInputDescription] = useState(description);
    const [inputExternalUrl, setInputExternalUrl] = useState(externalUrl);
    const [inputResponsable, setInputResponsable] = useState(responsable);
    const [inputMusiciansNumber, setInputMusiciansNumber] = useState(musiciansNum);
    const [selectedDept, setSelectedDept] = useState({value: dept, label: dept});
    const [selectedCity, setSelectedCity] = useState({value: city, label: city});
    const [selectedMomerType, setSelectedMomerType] = useState({value: momerTypeId, label: momerType});
    const [deptCodes, setDeptCodes] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(genres);

    const jwt = useSelector((state) => state.user.token);

    useEffect(() => {
        // controls re-render of personalProfile
        setUpdated(false);
    }, []);

    const onInputChange = (event) => {
        //dispatch(changeInputValue(event.target.name, event.target.value));
        switch (event.target.name) {
        case 'name':
            setInputName(event.target.value);
            break;
        case 'imageUrl':
            setInputImgUrl(event.target.value);
            break;
        case 'email':
            setInputEmail(event.target.value);
            break;
        case 'address':
            setInputAddress(event.target.value); 
            break;
        case 'phone':
            setInputPhone(event.target.value); 
            break;
        case 'description':
            setInputDescription(event.target.value); 
            break;
        case 'externalUrl':
            setInputExternalUrl(event.target.value); 
            break;
        case 'responsable':
            setInputResponsable(event.target.value); 
            break;
        case 'password':
            setInputPassword(event.target.value); 
            break;
        case 'musiciansNum':
            setInputMusiciansNumber(event.target.value); 
            break;
        default:
            console.log(`No inputs in sign-up`);
        }
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        console.log("Personal form submission");
        console.log(inputName);
        console.log(inputEmail);
        console.log(inputPassword);
        console.log(selectedDept);
        console.log(selectedCity);
        /*if (inputPassword !== confirmPassword) {
            toast.info('Assurez-vous que les mots de passe sont les mêmes', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } */
        // The details will be sent to the server via dispatch (we will create the redux middleware)

        // The password update will be handled later

        const momerToUpdate = {
            name: inputName,
            picture_url: inputImgUrl,
            city: selectedCity.value,
            email: inputEmail,
            phone: inputPhone,
            address: inputAddress,
            county: selectedDept.value,
            description: inputDescription,
            external_url: inputExternalUrl,
            momer_to_contact: inputResponsable,
            momer_type_id: selectedMomerType.value
        }

        const musicoToUpdate = {
            name: inputName,
            picture_url: inputImgUrl,
            city: selectedCity.value,
            email: inputEmail,
            phone: inputPhone,
            address: inputAddress,
            county: selectedDept.value,
            description: inputDescription,
            external_url: inputExternalUrl,
            momer_to_contact: inputResponsable,
            musical_type: selectedGenre,
            musicians_number: inputMusiciansNumber
        }
        try {
            let dbResponse;
            if (role === 'momer') {
                dbResponse = await axios.patch(`${API_BASE_URL}/profile`, momerToUpdate, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwt}`
                    }
                }
                );
            };

            if (role === 'musicos') {
                // Genres have to be converted into an array with genre ids, for example [1, 5, 3] etc.
                const genresIds = musicoToUpdate.musical_type.map(genre => (genre.id));
                musicoToUpdate.musical_type = genresIds;
                dbResponse = await axios.patch(`${API_BASE_URL}/profile`, musicoToUpdate, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwt}`
                    }
                }
                );
            };
            
            if (dbResponse.status === 200) {
                closeModal(true);
                setUpdated(true);
                //return navigate("/profile");
            } else {
                toast.error(`Erreur. La mise à jour n'a pas été faite.`, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch (error) {
            console.log(error);
            toast.error(`Erreur. La mise à jour n'a pas été faite. ${error.response.data.message}`, {
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
        <form className="personal-profile-form" onSubmit={handleUpdate}>
            <h1 className="personal-profile-form__title">Met à jour ton profil</h1>
            <div className = 'field'><div className = 'field__name'>Département :</div><div className= 'fieldValue'><DeptsDropdown selectedOption={selectedDept} setSelectedOption={setSelectedDept} onFocusOut={getDepartmentsCodes} isMulti={false} /></div></div>
            <div className = 'field'><div className = 'field__name'>Ville :</div><div className= 'fieldValue'><CitiesDropdown selectedOption={selectedCity} setSelectedOption={setSelectedCity} departmentCodes={deptCodes} isMulti={false} /></div></div>
            <div className = 'field'><div className = 'field__name'>Nom :</div><div className= 'fieldValue'><ControlledInput type="text" required inputValue={inputName} setInputValue={onInputChange} placeHolder="Nom d'établissement ou band..." name="name" /></div></div>
            <div className = 'field'><div className = 'field__name'>Email :</div><div className= 'fieldValue'><ControlledInput type="email" required inputValue={inputEmail} setInputValue={onInputChange} placeHolder="Votre email..." name="email" /></div></div>
            <div className = 'field'><div className = 'field__name'>Adresse :</div><div className= 'fieldValue'><ControlledInput type="text" inputValue={inputAddress} setInputValue={onInputChange} placeHolder="Adresse..." name="address" /></div></div>
            <div className = 'field'><div className = 'field__name'>Téléphone :</div><div className= 'fieldValue'><ControlledInput type="text" inputValue={inputPhone} setInputValue={onInputChange} placeHolder="Téléphone..." name="phone" /></div></div>
            <div className = 'field'><div className = 'field__name'>Description :</div><div className= 'fieldValue'><ControlledInput type="textArea" inputValue={inputDescription} setInputValue={onInputChange} placeHolder="Description..." name="description" /></div></div>
            <div className = 'field'><div className = 'field__name'>Lien externe :</div><div className= 'fieldValue'><ControlledInput type="text" inputValue={inputExternalUrl} setInputValue={onInputChange} placeHolder="External Url..." name="externalUrl" /></div></div>
            <div className = 'field'><div className = 'field__name'>Nom du responsable :</div><div className= 'fieldValue'><ControlledInput type="text" inputValue={inputResponsable} setInputValue={onInputChange} placeHolder="Nom du responsable..." name="responsable" /></div></div>
            {role === 'momer' && 
             <div className = 'field'><div className = 'field__name'>Type d'établissement :</div><div className= 'fieldValue'><MomerTypeDropdown selectedOption={selectedMomerType} setSelectedOption={setSelectedMomerType} isMulti={false} /></div></div>
            }
            {role === 'musicos' &&
            <>
                <div className = 'field'><div className = 'field__name'>Nombre de musicien :</div><div className= 'fieldValue'><ControlledInput type="text" inputValue={inputMusiciansNumber} setInputValue={onInputChange} placeHolder="Nombre de musiciens..." name="musiciansNum" /></div></div>
                <div className = 'field'><div className = 'field__name'>Genres musicaux :</div><div className= 'fieldValue'><GenreDropdown className="genre-select-form"  selectedOption={selectedGenre} setSelectedOption={setSelectedGenre} isMulti={true} /></div></div>
            </>
            }
            <div className = "personal-profile-form__button">
                <button className="button" type="submit">Valider</button>
                <button className="button" type="button" onClick={closeModal} >Annuler</button>
            </div>
        </form>
    );
};

export default PersonalProfileForm;
