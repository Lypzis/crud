import React from 'react';

import './input.css';

const input = props => {
    let inputElement = null;
    let validationError = null;

    if (props.invalid && props.shouldValidate && props.touched) {
        validationError = <p>Please enter a valid value!</p>
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className="input__input"
                {...props.elementConfig}
                defaultValue={props.value} onChange={props.changed} required={props.required} />
            break;
        case ('textarea'):
            inputElement = <textarea
                className=""
                {...props.elementConfig}
                defaultValue={props.value} onChange={props.changed} />
            break;
        case ('select'):
            const selectOptions = props.elementConfig.options.map(option => {
                return <option key={option.value} value={option.value}>{option.displayValue}</option>
            });

            inputElement = <select className="" onChange={props.changed}>
                {selectOptions}
            </select>
            break;
        default:
            inputElement = <input
                className="input__input"
                {...props.elementConfig}
                defaultValue={props.value} onChange={props.changed} />
    }



    return (
        <div className="input">
            <label className="label">
                {props.elementConfig.id}
            </label>
            <div className="input__box">
                {inputElement}
                {validationError}
            </div>
        </div>
    );
}

export default input;