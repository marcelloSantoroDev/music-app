import React, { Component } from 'react';
import Carregando from '../services/Carregando';
import { getUser } from '../services/userAPI';

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
    if (checkLoading) {
      return <Carregando />;
    }
    return (
      <div data-testid="header-component">
        <h1 data-testid="header-user-name">{userInfo?.name}</h1>
      </div>
    );
  }
}
