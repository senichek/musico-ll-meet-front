import PropTypes from 'prop-types';

import './style.scss'

const ControlledInput = ({ type, required, inputValue, setInputValue, placeHolder, name }) => {
    return (
        <div className="input_field">
            <input
                type={type}
                required={required}
                value={inputValue}
                onChange={(event) => setInputValue(event)}
                placeholder={placeHolder}
                name={name}
            />
        </div>
    );
};

ControlledInput.propTypes = {
    type: PropTypes.string,
    required: PropTypes.bool,
    inputValue: PropTypes.string,
    setInputValue: PropTypes.func,
    placeHolder: PropTypes.string,
};

export default ControlledInput;
