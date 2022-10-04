import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Carregando from '../services/Carregando';
import { addSong } from '../services/favoriteSongsAPI';

const obj = {
  loading: false,
  checkInput: false,
};

export default class MusicCard extends Component {
  state = { ...obj };

  handleFetch = () => {
    this.setState({ loading: true }, async () => {
      await addSong(this.props);
      this.setState({ loading: false, checkInput: true });
    });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, checkInput } = this.state;
    if (loading) {
      return <Carregando />;
    }
    return (
      <li>
        <span>{trackName}</span>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="Favorita">
          Favorita
          <input
            type="checkbox"
            name="Favorita"
            data-testid={ `checkbox-music-${trackId}` }
            onClick={ this.handleFetch }
            id="Favorita"
            defaultChecked={ checkInput }
          />
        </label>
      </li>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  // checkInput: PropTypes.bool.isRequired,
};
