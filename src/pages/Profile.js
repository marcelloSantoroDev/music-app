import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
// import Carregando from '../services/Carregando';
import { getUser } from '../services/userAPI';

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
    const { user } = this.state;

    // if (loading) {
    //   return <Carregando />;
    // }
    return (
      <div data-testid="page-profile">
        <Header />
        <p>{user.name}</p>
        <p>{user.email}</p>
        <p>{user.description}</p>
        <img data-testid="profile-image" src={ user.image } alt={ user.name } />
        <Link to="/profile/edit">Editar perfil</Link>
      </div>
    );
  }
}
