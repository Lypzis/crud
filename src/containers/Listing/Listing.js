import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import List from '../../components/List/list';

import sprite from '../../assets/icons/sprite.svg';

import './Listing.css';

import { getAllContracts, deleteContract } from '../../parse/contract';

class Listing extends Component {

  state = {
    contracts: null,
    renderedContracts: null,
  }

  componentDidMount() {
    this.getContracts();
  }

  /**
   * Adquire todos os contratos e os salva no state.
   */
  getContracts = async () => {
    try {
      const contracts = await getAllContracts();

      this.setState({
        contracts: contracts,
        renderedContracts: (
          <List
            list={contracts}
            verify={this.props.verify}
            delete={this.deleteRegister}
          />
        )
      });
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Remove um registro.
   */
  deleteRegister = async (event) => {
    event.preventDefault();

    try {
      await deleteContract(event.target.id);
      this.getContracts();
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    let contracts = <p className="message">-- Faça um novo cadastro :D --</p>;

    if (this.state.contracts && this.state.contracts.length > 0)
      contracts = this.state.renderedContracts;

    return (
      <div className="App">
        {contracts}
        <Link to='/register' className="button button__link">
          <svg className="button__icon">
            <use xlinkHref={`${sprite}#icon-file-text2`}></use>
          </svg>
          Cadastrar
        </Link>
      </div>
    );
  }
}

export default Listing;