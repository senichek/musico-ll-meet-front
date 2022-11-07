import './style.scss';

import { useState, useEffect } from 'react';
import Select from 'react-select'; // https://react-select.com/
import PropTypes from 'prop-types';
import departements from '../../data/departements.json'

const DeptsDropdown = ({ selectedOption, setSelectedOption, onFocusOut, isMulti }) => {
    
    const [options, setOptions] = useState([]);

    // generate options for dropDown list
    const generateOptions = async () => {
        const result = [];
        for (const dept of departements) {
            result.push({
                value: dept.nom,
                label: dept.nom,
                code: dept.code
            })
        }
        setOptions(result);
        console.log("Options depts >>>", result);
    }

    useEffect(() => {
        generateOptions();
    }, []);

    return (
        <div className='deps-select-form'>
            <Select
                value={selectedOption}
                onChange={setSelectedOption}
                options={options}
                isMulti={isMulti} // Multi selection
                placeholder="Choisis un département..."
                onBlur={onFocusOut} // when we click elsewhere
            />
        </div>
    );
};

DeptsDropdown.propTypes = {
    selectedOption: PropTypes.any, // it can be either array or an object depending if the select is multiple or not.
    setSelectedOption: PropTypes.func,
    onFocusOut: PropTypes.func,
};

export default DeptsDropdown;
