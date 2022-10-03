import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Carregando from '../services/Carregando';
import { createUser, getUser } from '../services/userAPI';

const obj = {
  nameLogin: '',
  buttonLogin: true,
  renderLoading: false,
};

export default class Login extends Component {
  state = { ...obj };

  onInputChange = (event) => {
    const { name, value } = event.target;
    const THREE = 3;
    this.setState({
      [name]: value,
      buttonLogin: (value.length < THREE),
    });
  };

  onEnterButton = () => {
    const { nameLogin } = this.state;
    const { history } = this.props;
    const { push } = history;
    this.setState({ renderLoading: true }, async () => {
      await createUser({ name: nameLogin });
      push('/search');
    });
  };

  render() {
    const { buttonLogin, nameLogin, renderLoading } = this.state;
    if (renderLoading) {
      return <Carregando />;
    }
    return (
      <div data-testid="page-login">
        <input
          type="text"
          placeholder="Nome"
          data-testid="login-name-input"
          name="nameLogin"
          value={ nameLogin }
          onChange={ this.onInputChange }
        />
        <button
          type="button"
          data-testid="login-submit-button"
          disabled={ buttonLogin }
          onClick={ this.onEnterButton }
        >
          Entrar

        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
