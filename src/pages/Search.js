import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Carregando from '../services/Carregando';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

const obj = {
  searchValue: '',
  searchButton: true,
  loading: false,
  responseValue: [],
  flag: false,
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

  handleFetch = () => {
    const { searchValue } = this.setState;
    this.setState({ loading: true, flag: true }, async () => {
      const responseAPI = await searchAlbumsAPI(searchValue);
      console.log(responseAPI);
      this.setState({ responseValue: responseAPI }, () => {
        this.setState({ loading: false });
      });
    });
  };

  render() {
    const { searchValue, searchButton, loading, responseValue, flag } = this.state;
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
            type="button"
            data-testid="search-artist-button"
            disabled={ searchButton }
            onClick={ this.handleFetch } // => função recebe uma string com o nome da banda
          >
            Pesquisar

          </button>
        </form>
        {loading && <Carregando />}
        {flag && (
          <p>
            Resultado de álbuns de:
            {' '}
            {searchValue}
          </p>
        )}
        {(responseValue.length === 0 && flag) ? (
          <p>Nenhum álbum foi encontrado</p>)
          : (
            <ul>
              {responseValue
                .map((element, index) => (
                  <Link
                    data-testid={ `link-to-album-${element.collectionId}` }
                    key={ index }
                    to={ `/album/${element.collectionId}` }
                  >
                    {JSON.stringify(element)}

                  </Link>))}
            </ul>
          )}
      </div>
    );
  }
}
