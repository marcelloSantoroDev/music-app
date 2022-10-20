import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../services/Carregando';
import { getUser } from '../services/userAPI';
import './Header.css';

const obj = {
  userInfo: '',
  checkLoading: false,
};
export default class Header extends Component {
  state = { ...obj };

  componentDidMount() {
    this.onFetch();
  }

  onFetch = () => {
    this.setState({ checkLoading: true }, async () => {
      this.setState({ userInfo: await getUser() }, () => {
        this.setState({ checkLoading: false });
      });
    });
  };

  render() {
    const { userInfo, checkLoading } = this.state;
    return (
      <div data-testid="header-component" className="header-component">
        <h1
          data-testid="header-user-name"
          className="header-user-name"
        >
          { checkLoading ? <Carregando /> : <p>{`Bem-vindo, ${userInfo?.name}!`}</p>}

        </h1>
        <Link
          to="/search"
          data-testid="link-to-search"
          className="nav-input"
        >
          Pesquisa

        </Link>
        <Link
          to="/favorites"
          data-testid="link-to-favorites"
          className="nav-input"
        >
          Favoritas

        </Link>
        <Link
          to="/profile"
          data-testid="link-to-profile"
          className="nav-input"
        >
          Perfil

        </Link>
      </div>
    );
  }
}
