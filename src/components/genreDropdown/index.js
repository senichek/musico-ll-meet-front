import './style.scss';

import { useState, useEffect } from 'react';
import Select from 'react-select'; // https://react-select.com/
import PropTypes from 'prop-types';
import genres from '../../data/genres.json'

const GenreDropdown = ({ selectedOption, setSelectedOption, isMulti }) => {
    
    const [options, setOptions] = useState([]);

    // generate options for dropDown list
    const generateOptions = async () => {
        const result = [];
        for (const genre of genres) {
            result.push({
                value: genre.name,
                label: genre.name,
                id: genre.id
            })
        }
        setOptions(result);
        console.log("Options depts >>>", result);
    }

    useEffect(() => {
        generateOptions();
    }, []);

    return (
        <div className='genre-select-form'>
            <Select
                value={selectedOption}
                onChange={setSelectedOption}
                options={options}
                isMulti={isMulti} // Multi selection
                placeholder="Genre musical"
            />
        </div>
    );
};

GenreDropdown.propTypes = {
    selectedOption: PropTypes.any, // it can be either array or an object depending if the select is multiple or not.
    setSelectedOption: PropTypes.func,
    onFocusOut: PropTypes.func,
};

export default GenreDropdown;
