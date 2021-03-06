import React, { Component } from 'react';

import './style.css';

class LinkDisplay extends Component {
  renderLinks(visitedLinks) {
    // Map through the links and display each one
    return visitedLinks.map((link, i) => {
      return (
        <a
          href={`https://en.wikipedia.org/wiki/${link}`}
          className="link-tile"
          key={i}
        >
          <span className="link-number">{i + 1}</span>
          <span>{link}</span>
        </a>
      );
    });
  }

  render() {
    const { visitedLinks } = this.props;

    return (
      <div className="link-container">
        {this.renderLinks(visitedLinks)}
      </div>
    );
  }
}

export default LinkDisplay;
// https://en.wikipedia.org/wiki/Canis
