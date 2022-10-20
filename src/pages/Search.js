import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Carregando from '../services/Carregando';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import './Search.css';
import imgLogo from '../imgs/logo.png';

const obj = {
  searchValue: '',
  searchCheck: '',
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
    const { searchValue } = this.state;
    this.setState({ loading: true, flag: true }, async () => {
      const responseAPI = await searchAlbumsAPI(searchValue);
      console.log(responseAPI);
      this.setState({
        responseValue: responseAPI,
        searchCheck: searchValue,
        loading: false }, () => {
        this.setState({ searchValue: '' });
      });
    });
  };

  render() {
    const {
      searchValue, searchButton, loading, responseValue, flag, searchCheck } = this.state;
    return (
      <div data-testid="page-search" className="page-search">
        <Header />
        <div>
          <div className="form">
            <form action="" method="get">
              <img src={ imgLogo } alt="" className="logoimg2" />
              <input
                value={ searchValue }
                name="searchValue"
                type="text"
                placeholder="o que está procurando?"
                data-testid="search-artist-input"
                onChange={ this.onInputChange }
              />
              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ searchButton }
                onClick={ this.handleFetch }
              >
                Pesquisar

              </button>
            </form>
          </div>
          <div className="searched">
            {loading && <Carregando />}
            {flag && (
              <h2 className="albuns">
                Resultado de álbuns de:
                {' '}
                {' '}
                {searchCheck}
              </h2>
            )}
            {(responseValue.length === 0 && flag) ? (
              <p>Nenhum álbum foi encontrado</p>)
              : (
                <ul className="albuns">
                  {responseValue
                    .map((element, index) => (
                      <Link
                        data-testid={ `link-to-album-${element.collectionId}` }
                        key={ index }
                        to={ `/album/${element.collectionId}` }
                        className="link"
                      >
                        <div className="collection">
                          <p className="collectionName">
                            {element.collectionName}
                          </p>
                          <img
                            src={ element.artworkUrl100 }
                            alt="llala"
                            className="collectionImg"
                          />
                        </div>

                      </Link>))}
                </ul>
              )}
          </div>
        </div>
      </div>
    );
  }
}
