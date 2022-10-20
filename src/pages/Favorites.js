import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Carregando from '../services/Carregando';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import './Favorites.css';

const obj = {
  favorites: [],
  loading: true,
};

export default class extends Component {
  state = { ...obj };

  componentDidMount() {
    this.handleFavoriteFetch();
  }

  handleFavoriteFetch = async () => {
    const getFavs = await getFavoriteSongs();
    this.setState({
      favorites: [...getFavs],
      loading: false,
    });
  };

  render() {
    const { loading, favorites } = this.state;
    if (loading) {
      return <Carregando />;
    }
    return (
      <div data-testid="page-favorites" className="page-favorites">
        <Header />
        <h1>Favoritas</h1>
        {favorites
          .map((element) => (<MusicCard
            key={ element.trackId }
            object={ element }
            handleFavoriteFetch={ this.handleFavoriteFetch }
          />))}
      </div>
    );
  }
}
