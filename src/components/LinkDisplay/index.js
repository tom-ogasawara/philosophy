import React, { Component } from 'react';
import './style.css';

class LinkDisplay extends Component {
  constructor(props) {
    super(props);

    this.renderLinks = this.renderLinks.bind(this);
  }

  renderLinks(visitedLinks) {
    return visitedLinks.map((link, i) => {
      return (
        <div className="link-tile" key={i}>
          {`${i} ${link}`}
        </div>
      );
    });
  }

  render() {
    const { visitedLinks } = this.props;
    console.log('visitedLinks: ', visitedLinks);
    return (
      <div className="link-container">
        {this.renderLinks(visitedLinks)}
      </div>
    );
  }
}

export default LinkDisplay;
