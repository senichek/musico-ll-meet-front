import './style.scss'
import { useState } from 'react';
import DeptsDropdown from "../departementsDropdown";
import CitiesDropdown from "../citiesDropdown";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from 'prop-types';


const FilterMomers = ({ setFinalUrl }) => {

    // There are too many cities, we have to show in dropdown 
    // only those related to the departement chosen.
    const [selectedDept, setSelectedDept] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [deptCodes, setDeptCodes] = useState([]);

    const handleFilterFormSubmit = (event) => {
        event.preventDefault();
        console.log("FilterForm depts >>>", selectedDept);
        console.log("FilterForm cities >>>", selectedCity);

        // Gather urlParams and variables according to the fields
        // that has been used in the filter.
        const usedInputs = [];
        const urlParams = [];
        
        if (selectedDept) {
            usedInputs.push(selectedDept);
            const url = `county[]=${selectedDept.value}`;
            urlParams.push(url);
        };
        if (selectedCity) {
            usedInputs.push(selectedCity);
            const url = `city[]=${selectedCity.value}`;
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
        setSelectedCity("");
        // The change of finalUrl will trigger re-render of the list of Momers
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
                    <CitiesDropdown selectedOption={selectedCity} setSelectedOption={setSelectedCity} departmentCodes={deptCodes} isMulti={false} />
                    <button className='button' type="submit">Filtrer</button>
                    <button className='button' type="button" onClick={handleReset}>Réinitialiser</button>
                </form>
            )}
        </div>
    );
};

FilterMomers.propTypes = {
    setFinalUrl: PropTypes.func
};

export default FilterMomers;