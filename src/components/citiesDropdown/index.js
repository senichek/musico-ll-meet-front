import './style.scss';

import { useState, useEffect } from 'react';
import Select from 'react-select'; // https://react-select.com/
import PropTypes from 'prop-types';
import cities from '../../data/cities.json'; // Hard-coded cities because APIs are too slow for 3500 cities.

const CitiesDropdown = ({ selectedOption, setSelectedOption, departmentCodes, isMulti }) => {

    const [options, setOptions] = useState([]);

    // Pick only those cities located in a specific departement
    const getCitiesByDepartments = (deptCodes) => {
        const result = [];
        for (const code of deptCodes) {
            for (const city of cities) {
                if (code === city.codeDepartement) {
                    result.push(city);
                }
            }
        }
        return result;
    }


    // generate options for dropDown list
    const generateOptions = async () => {
        const result = [];
        const citiesByDept = getCitiesByDepartments(departmentCodes);
        for (const city of citiesByDept) {
            result.push({
                value: city.nom,
                label: city.nom
            })
        }
        setOptions(result);
        console.log("Options (cities) >>>", result);
    }

    useEffect(() => {
        generateOptions();
    }, [departmentCodes]); // as soon as we have something in departmentCodes array we generate options
    // In other words we generate options for city dropdown after we have selected department(s)

    return (
        <div className='cities-select-form'>
            <Select
                value={selectedOption}
                onChange={setSelectedOption}
                options={options}
                isMulti={isMulti} // Multi selection
                placeholder="Choisi une ville..."
            />
        </div>
    );
};

CitiesDropdown.propTypes = {
    selectedOption: PropTypes.any, // can be array or object depending if the select is multiple or not.
    setSelectedOption: PropTypes.func,
};

export default CitiesDropdown;
