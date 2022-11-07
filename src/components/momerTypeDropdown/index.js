import './style.scss';

import { useState, useEffect } from 'react';
import Select from 'react-select'; // https://react-select.com/
import PropTypes from 'prop-types';
import types from '../../data/momerTypes.json'

const MomerTypeDropdown = ({ selectedOption, setSelectedOption, isMulti }) => {
    
    const [options, setOptions] = useState([]);

    // generate options for dropDown list
    const generateOptions = async () => {
        const result = [];
        for (const type of types) {
            result.push({
                value: type.id,
                label: type.name,
            })
        }
        setOptions(result);
        console.log("Options momer types >>>", result);
    }

    useEffect(() => {
        generateOptions();
    }, []);

    return (
        <div className='momer-type-select-form'>
            <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                isMulti={isMulti} // Multi selection
                placeholder="Momer type..."
            />
        </div>
    );
};

MomerTypeDropdown.propTypes = {
    selectedOption: PropTypes.any, // it can be either array or an object depending if the select is multiple or not.
    setSelectedOption: PropTypes.func,
    onFocusOut: PropTypes.func,
};

export default MomerTypeDropdown;
