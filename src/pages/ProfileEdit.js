import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import Carregando from '../services/Carregando';
// import Carregando from '../services/Carregando';
import { getUser, updateUser } from '../services/userAPI';

const obj = {
  name: '',
  email: '',
  image: '',
  description: '',
  loading: false,
  disable: true,
};

export default class ProfileEdit extends Component {
  state = { ...obj };

  componentDidMount() {
    this.handleFetch();
  }

  handleFetch = async () => {
    const getUserInfo = await getUser();
    const { name, email, description, image } = getUserInfo;
    this.setState({
      name,
      email,
      description,
      image,
    }, this.validations);
  };

  validations = () => {
    const { name, email, description, image } = this.state;
    const regex = /\S+@\S+\.\S+/;
    const emailValidation = regex.test(email);
    if (name.length > 0
      && description.length > 0
      && image.length > 0
      && emailValidation) {
      this.setState({ disable: false });
    } else {
      this.setState({ disable: true });
    }
  };

  onInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, this.validations);
  };

  handleClick = async () => {
    const { name, email, image, description } = this.state;
    const { history } = this.props;
    const newObj = { name, email, image, description };
    this.setState({ loading: true });
    await updateUser({ ...newObj });
    history.push('/profile');
  };

  render() {
    const { disable, name, email, description, image, loading } = this.state;
    if (loading) {
      return <Carregando />;
    }
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <form action="GET">
          <input
            type="text"
            data-testid="edit-input-name"
            onChange={ this.onInputChange }
            value={ name }
            name="name"
          />
          <input
            type="text"
            data-testid="edit-input-email"
            onChange={ this.onInputChange }
            value={ email }
            name="email"
          />
          <input
            type="text"
            data-testid="edit-input-description"
            onChange={ this.onInputChange }
            value={ description }
            name="description"
          />
          <input
            type="text"
            data-testid="edit-input-image"
            onChange={ this.onInputChange }
            value={ image }
            name="image"
          />
          <button
            type="button"
            data-testid="edit-button-save"
            disabled={ disable }
            onClick={ this.handleClick }
          >
            Salvar

          </button>
        </form>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
