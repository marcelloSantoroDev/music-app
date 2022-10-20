import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Carregando from '../services/Carregando';
import { createUser } from '../services/userAPI';
import './Login.css';
import logoImg from '../imgs/logo.png';

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
      <div data-testid="page-login" className="loginContainer">
        <div className="input-button">
          <img src={ logoImg } alt="logo" className="logoimg" />
          <input
            type="text"
            placeholder="digite o seu nome"
            data-testid="login-name-input"
            name="nameLogin"
            value={ nameLogin }
            onChange={ this.onInputChange }
            className="input"
          />
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ buttonLogin }
            onClick={ this.onEnterButton }
            className="btn"
          >
            Entrar

          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
