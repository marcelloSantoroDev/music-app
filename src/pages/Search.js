import React, { Component } from 'react';
import Header from '../components/Header';

const obj = {
  searchValue: '',
  searchButton: true,
};

export default class extends Component {
  state = { ...obj };

  onInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      searchButton: (value.length < 2),
    });
  };

  render() {
    const { searchValue, searchButton } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form action="" method="get">
          <input
            value={ searchValue }
            name="searchValue"
            type="text"
            placeholder="banda/artista"
            data-testid="search-artist-input"
            onChange={ this.onInputChange }
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ searchButton }
          >
            Pesquisar

          </button>
        </form>
      </div>
    );
  }
}
