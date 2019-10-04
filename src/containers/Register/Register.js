import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import Input from '../../components/UI/Input/input';
import Button from '../../components/UI/button/button';

import {saveContract} from '../../parse/contract';

import sprite from '../../assets/icons/sprite.svg';

class Register extends Component {

    state = {
        registerForm: null,
        formIsValid: false
    }

    componentDidMount() {
        const registerForm = {
            name: this.createFormElement('input', { type: 'text', placeholder: 'nome', id: 'nome' }, { required: true }),
            lastName: this.createFormElement('input', { type: 'text', placeholder: 'sobrenome', id: 'sobrenome' }, { required: true }),
            email: this.createFormElement('input', { type: 'email', placeholder: 'email', id: 'email' }, { required: true }),
            cpf: this.createFormElement('input', { type: 'text', placeholder: 'cpf', id: 'cpf', maxlength: '14' }, { required: true, max: 14, min: 14 }),
            telephone: this.createFormElement('input', { type: 'text', placeholder: 'telefone', id: 'telefone', maxlength: '13' }, { required: true, max: 14, min: 14 }),
            pdfContract: this.createFormElement('input', { type: 'file', placeholder: 'arquivo', id: 'contrato', accept:'.doc,.docx,.pdf' }, { required: true, notText: true })
        }

        this.setState({
            registerForm: registerForm
        });
    }

    /**
     * Configura atributos para um elemento 'input'.
     * @param {string} elementType ex.: "input", "select", ...
     * @param {Object} elementConfig ex.: Em caso de text inputs: {type:"text", placeholder:"Your Name"}
     * @param {Object} validationParams ex.: {required: true, minSize: 5, ...}
     * @param {string} value ex.: "Alfred"
     * @returns object
     */
    createFormElement = (elementType, elementConfigParams, validationParams = {}, value = '') => {
        switch (elementType) {
            case ('input'):
                return {
                    elementType: elementType,
                    elementConfig: {
                        type: elementConfigParams.type,
                        placeholder: elementConfigParams.placeholder,
                        id: elementConfigParams.id,
                        maxLength: elementConfigParams.maxlength,
                        accept: elementConfigParams.accept
                    },
                    value: value,
                    validation: validationParams,
                    valid: false,
                    touched: false
                }
            case ('select'):
                return {
                    elementType: 'select',
                    elementConfig: {
                        /*
                        options: [
                            { value: 'none', displayValue: '-- Select --' },
                        ]
                        */
                    },
                    value: 'none',
                    validation: {},
                    valid: false
                }
            default:
                return -1
        }
    }

    /**
     * Verifica a validade do valor do campo de acordo com as regras
     * que possui.
     */
    checkValidity = (value, rules) => {
        let isValid = true; 

        if (rules.required && !rules.notText)
            isValid = value.trim() !== '' && isValid;

        return isValid;
    }

    /**
     * Adiciona uma "máscara" no campo.
     */
    maskInput = (event) => {
        let mask;

        if (event.target.id === 'cpf')
            mask = '###.###.###-##';
        else if (event.target.id === 'telefone')
            mask = '##-#####-####';

        var i = event.target.value.length;
        var exit = mask.substring(0, 1);
        var text = mask.substring(i);

        if (text.substring(0, 1) !== exit) {
            event.target.value += text.substring(0, 1);
        }
    }

    /**
     * Escuta mudanças nos valores dos campos,
     * salva e os valida dinâmicamente.
     */
    inputChangedHandler = (event, inputIdentifier) => {
        const updatedRegisterForm = { ...this.state.registerForm };
        const updatedFormElement = { ...updatedRegisterForm[inputIdentifier] };

        if (event.target.id === 'cpf' || event.target.id === 'telefone')
            this.maskInput(event);

        if (event.target.id === 'contrato')
            updatedFormElement.value = event.currentTarget.files
        else
            updatedFormElement.value = event.target.value; // so the value is updated here

        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);

        updatedFormElement.touched = true;

        updatedRegisterForm[inputIdentifier] = updatedFormElement; // and then updated to the cloned form

        let formIsValid = true;

        for (let inputIdentifier in updatedRegisterForm) {
            formIsValid = updatedRegisterForm[inputIdentifier].valid && formIsValid; // :D, remember if one is false, everything is!
        }

        this.setState({
            registerForm: updatedRegisterForm,
            formIsValid: formIsValid
        });
    }

    /**
     * Renderiza um array de inputs de acordo com o que está
     * no state.
     */
    renderInputs = () => {
        const accumulator = [];

        for (let input in this.state.registerForm) {
            accumulator.push(
                <Input
                    key={input}
                    label={this.state.registerForm[input].elementType}
                    elementType={this.state.registerForm[input].elementType}
                    elementConfig={this.state.registerForm[input].elementConfig}
                    value={this.state.registerForm[input].value}
                    invalid={!this.state.registerForm[input].valid}
                    shouldValidate={this.state.registerForm[input].validation}
                    touched={this.state.registerForm[input].touched}
                    changed={event => this.inputChangedHandler(event, input)}
                    fileHandler={this.fileInputHandler}
                    required />
            );
        }

        return accumulator;
    }

    /**
     * Registra todos os valores salvos no state,
     * então redireciona para o ínicio.
     */
    registerHandler = async (event) => {
        event.preventDefault();

        const registerForm = {}; 

        for (let formElementIdentifier in this.state.registerForm) {
            registerForm[formElementIdentifier] = this.state.registerForm[formElementIdentifier].value;
        }

        try {
            await saveContract(registerForm); 
            this.props.history.push('/');
        } catch(err){
            console.log(err);
        }
       
    }

    render() {
        const formFields = this.renderInputs();

        return (
            <div>
                <form onSubmit={this.registerHandler}>
                    {formFields}
                    <div className="button-box">
                    <Link to='/' className="button button__link">
                        <svg className="button__icon">
                            <use xlinkHref={`${sprite}#icon-arrow-left2`}></use>
                        </svg>
                        Voltar
                    </Link>
                    <Button className="button">
                        <svg className="button__icon">
                            <use xlinkHref={`${sprite}#icon-clipboard`}></use>
                        </svg>
                        Registrar
                    </Button>
                    </div>
                    
                </form>

            </div>
        );
    }
}

export default Register;