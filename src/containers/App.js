import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';

import Register from './Register/Register';
import Listing from './Listing/Listing';
import Contract from './Contract/Contract';

import './App.css';

class App extends Component {

  state = {
    contractId: null
  }

  /**
   * Salva o id do contrato no 'state';
   */
  getContractId = event => {
    event.preventDefault();

    this.setState({
      contractId: event.target.id
    });
  }

  render() {
    return (
      <div className="App">
        <h1 className="App__title">Cadastros</h1>
        <Switch>
          <Route path='/contract/:id' render={props => <Contract contract={this.state.contractId} {...props} />} />
          <Route path='/register' component={Register} />
          <Route path='/' render={props => <Listing verify={this.getContractId} {...props} />} />
        </Switch>
      </div>
    );
  }
}

export default App;