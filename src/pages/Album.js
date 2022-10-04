import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Carregando from '../services/Carregando';
import MusicCard from '../components/MusicCard';

const obj = {
  artistResponse: '',
  loading: true,
};

export default class Album extends Component {
  state = { ...obj };

  componentDidMount() {
    this.handleFetch();
  }

  handleFetch = async () => {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    this.setState({ artistResponse: response, loading: false });
  };

  render() {
    const { artistResponse, loading } = this.state;
    if (loading) {
      return <Carregando />;
    }
    return (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="artist-name">{artistResponse[0].artistName}</h1>
        <h2 data-testid="album-name">{artistResponse[0].collectionName}</h2>
        {artistResponse
          .filter((element) => element.trackName !== undefined)
          .map((arg, index) => <MusicCard key={ index } { ...arg } />)}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape().isRequired,
};
