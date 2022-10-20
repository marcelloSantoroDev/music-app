import React, { Component } from 'react';
import './Carregando.css';

export default class Carregando extends Component {
  render() {
    return (
      <div className="load-container">
        <div className="lds-ring">
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    );
  }
}
