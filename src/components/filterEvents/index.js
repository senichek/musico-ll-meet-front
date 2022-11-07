import './style.scss'
import { useState } from 'react';
import DeptsDropdown from "../departementsDropdown";
import DatePicker from "react-datepicker"; // https://www.npmjs.com/package/react-datepicker
import "react-datepicker/dist/react-datepicker.css";
import GenreDropdown from '../genreDropdown';
import ControlledInput from '../controlledInput';
import { dateFormatter } from '../../utils/dateFormatter';
import PropTypes from 'prop-types';


const FilterEvents = ({ setFinalUrl }) => {

    // There are too many cities, we have to show in dropdown 
    // only those related to the departement chosen.
    const [selectedDept, setSelectedDept] = useState("");
    /* const [selectedCity, setSelectedCity] = useState(null); */
    const [selectedGenre, setSelectedGenre] = useState("");
    const [deptCodes, setDeptCodes] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [inputEventType, setInputEventType] = useState("");

    const onInputChange = (event) => {
        //dispatch(changeInputValue(event.target.name, event.target.value));
        switch (event.target.name) {
        case 'eventType':
            setInputEventType(event.target.value);
            break;
        default:
            console.log(`No inputs in filter of events`);
        }
    };

    const handleFilterFormSubmit = (event) => {
        event.preventDefault();
        console.log("FilterForm depts >>>", selectedDept);
        /* console.log("FilterForm cities >>>", selectedCity); */
        console.log("FilterForm genres >>>", selectedGenre);
        console.log("FilterForm event_type >>>", inputEventType);
        console.log("FilterForm date >>>", startDate);

        // Gather urlParams and variables according to the fields
        // that has been used in the filter.
        const usedInputs = [];
        const urlParams = [];
        
        if (selectedDept) {
            usedInputs.push(selectedDept);
            const url = `county[]=${selectedDept.value}`;
            urlParams.push(url);
        };
        if (selectedGenre) {
            usedInputs.push(selectedGenre);
            const url = `typeOfMusic[]=${selectedGenre.value}`;
            urlParams.push(url);
        };
        if (inputEventType) {
            usedInputs.push(inputEventType);
            const url = `eventType[]=${inputEventType}`;
            urlParams.push(url);
        };
        if (startDate) {
            usedInputs.push(startDate);
            // It returns DD-MM-YYYY (e.g. 29-05-2022)
            const dt = dateFormatter(startDate);
            const url = `eventDate[]=${dt}`;
            urlParams.push(url);
        };

        // Joining the params and separate them by "&" for url
        let finalUrl = urlParams.join("&");
        // The parameters part of URL must start with "?"
        finalUrl = "?" + finalUrl;
        setFinalUrl(finalUrl);
        console.log("FInal URL >>>", finalUrl);
    }

    // We need the departments codes to pick the cities from these departements, 
    // cause we cannot show the dropdown of 3500 cities, it's too slow.
    const getDepartmentsCodes = () => {
        // if we choose one department from the list it's going to be an object.
        // if we choose two and more - there is going to be an array.
        console.log(selectedDept);
        if (!Array.isArray(selectedDept)) {
            setDeptCodes([selectedDept.code]);
        } else {
            const codes = selectedDept.map(dept => (dept.code));
            setDeptCodes(codes);
        }
    }
    //
    const [toggleFilter, setToggleFilter] = useState(false);
    const filterMenu = () => {
        setToggleFilter(!toggleFilter);
    }

    const handleReset = () => {
        setSelectedDept("");
        setSelectedGenre("");
        setInputEventType("");
        setStartDate(null);
        // The change of finalUrl will trigger re-render of the eventList
        setFinalUrl("");
    };

    return (
        <div className='filter'>
            {!toggleFilter &&(
                <button className='button toggleFilterMenu' onClick={filterMenu}>Filtrer</button>
            )}    
            {toggleFilter &&(
                <form onSubmit={handleFilterFormSubmit} className="filter-form">
                    <div className='closeMenu'>
                        <button className='closeMenu__X' onClick={filterMenu}>+</button>
                    </div>
                    <DeptsDropdown selectedOption={selectedDept} setSelectedOption={setSelectedDept} onFocusOut={getDepartmentsCodes} isMulti={false} />
                    {/* <CitiesDropdown selectedOption={selectedCity} setSelectedOption={setSelectedCity} departmentCodes={deptCodes} isMulti={true} /> */}
                    <GenreDropdown selectedOption={selectedGenre} setSelectedOption={setSelectedGenre} isMulti={false} />
                    <ControlledInput type="text" inputValue={inputEventType} setInputValue={onInputChange} placeHolder="type d'événement..." name="eventType" />
                    <div className='date-select'>
                        <p>Rechercher une date</p>
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} dateFormat="dd-MM-yyyy" />
                    </div>
                    <button className='button' type="submit">Filtrer</button>
                    <button className='button' type="button" onClick={handleReset}>Réinitialiser</button>
                </form>
            )}
        </div>
    );
};

FilterEvents.propTypes = {
    setFinalUrl: PropTypes.func
};

export default FilterEvents;