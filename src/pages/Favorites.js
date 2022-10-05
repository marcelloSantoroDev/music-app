import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Carregando from '../services/Carregando';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

const obj = {
  favorites: [],
  loading: true,
};

export default class extends Component {
  state = { ...obj };

  componentDidMount() {
    this.handleFetch();
  }

  handleFetch = async () => {
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
      <div data-testid="page-favorites">
        <Header />
        {favorites
          .map((element) => <MusicCard key={ element.trackId } { ...element } />)}
      </div>
    );
  }
}
