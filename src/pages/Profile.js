import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Carregando from '../services/Carregando';
import { getUser } from '../services/userAPI';
import './Profile.css';

const obj = {
  user: {},
  loading: true,
};

export default class extends Component {
  state = { ...obj };

  componentDidMount() {
    this.handleFetch();
  }

  handleFetch = async () => {
    const getUserInfo = await getUser();
    this.setState({ user: { ...getUserInfo }, loading: false });
  };

  render() {
    const { user, loading } = this.state;

    if (loading) {
      return <Carregando />;
    }
    return (
      <div data-testid="page-profile" className="page">
        <Header />
        <h1>{`Perfil de ${user.name}`}</h1>
        <div className="page-profile">
          Email:
          <p className="profile">{user.email}</p>
          Descrição:
          <p className="profile">{user.description}</p>
          <p>
            <img
              data-testid="profile-image"
              src={ user.image }
              alt="imagem"
              className="profile-image"
            />
          </p>
          <Link
            to="/profile/edit"
          >
            <button type="button" className="edit-link">Editar Perfil</button>

          </Link>
        </div>
      </div>
    );
  }
}
