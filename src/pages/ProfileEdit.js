import React, { Component } from 'react';
import Header from '../components/Header';
// import Carregando from '../services/Carregando';
import { getUser } from '../services/userAPI';

const obj = {
  user: {},
  loading: true,
  disable: true,
};

export default class extends Component {
  state = { ...obj };

  componentDidMount() {
    this.handleFetch();
  }

  handleFetch = async () => {
    const getUserInfo = await getUser();
    // await getUser();
    this.setState({ user: { ...getUserInfo } });
  };

  onInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      disable: (value.length > 0),
    });
  };

  render() {
    const { disable, user } = this.state;
    // if (loading) {
    //   return <Carregando />;
    // }
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <form action="GET">
          <input
            type="text"
            data-testid="edit-input-name"
            onChange={ this.onInputChange }
            value={ user.name }
          />
          <input
            type="text"
            data-testid="edit-input-email"
            onChange={ this.onInputChange }
            value={ user.email }
          />
          <input
            type="text"
            data-testid="edit-input-description"
            onChange={ this.onInputChange }
            value={ user.description }
          />
          <input
            type="text"
            data-testid="edit-input-image"
            onChange={ this.onInputChange }
            value={ user.image }
          />
          <button
            type="button"
            data-testid="edit-button-save"
            disabled={ disable }
          >
            Salvar

          </button>
        </form>
      </div>
    );
  }
}
