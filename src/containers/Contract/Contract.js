import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'parse';

import { getContract, getPerson } from '../../parse/contract';

import sprite from '../../assets/icons/sprite.svg';

import './Contract.css';

class Contract extends Component {

    state = {
        contract: null,
        contractId: null
    }

    componentDidMount() {
        this.setState({
            contractId: this.props.match.params.id
        });
    }

    /**
     * Adquire informação de um contrato específico para 
     * demonstração
     */
    getContractInformation = async () => {
        try {
            const contractData = await getContract(this.state.contractId);
            const personData = await getPerson(contractData);

            this.setState({
                contract: (
                    <React.Fragment>
                        <ul className="list">
                            <p>Título: {contractData.get('title')}</p>
                            <p>Início: {contractData.get('startDate')}</p>
                            <p>Vencimento: {contractData.get('endDate')}</p>
                        </ul>
                        <div className="Contract">
                            <p className="Contract__field">Nome: {personData.get('name')}</p>
                            <p className="Contract__field">Sobrenome: {personData.get('lastName')}</p>
                            <p className="Contract__field">Email: {personData.get('email')}</p>
                            <p className="Contract__field">CPF: {personData.get('cpf')}</p>
                            <p className="Contract__field">Telefone: {personData.get('telephone')}</p>
                            <a download href={personData.get('contract').url()} className="button button__link button__link--download">
                                <svg className="button__icon">
                                    <use xlinkHref={`${sprite}#icon-cloud-download`}></use>
                                </svg>
                                Baixar Contrato
                            </a>
                        </div>
                    </React.Fragment>
                )
            });

            return contractData;
        } catch (err) {
            console.log(err);
        }
    }

    render() {

        if (this.state.contractId && !this.state.contract) {
            this.getContractInformation();
        }

        return (
            <div>
                {this.state.contract}
                <Link to='/' className="button button__link">
                    <svg className="button__icon">
                        <use xlinkHref={`${sprite}#icon-arrow-left2`}></use>
                    </svg>
                    Voltar
                </Link>
            </div>
        );
    }
}

export default Contract;