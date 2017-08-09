import React, { Component } from 'react';
import axios from 'axios';

import ResultDisplay from '../ResultDisplay';
import './style.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      textBody: '',
      stepsTaken: 0,
      pathFound: false,
      giveUp: false,
      looping: false,
      invalidSearch: false,
      visitedLinks: []
    };
  }

  beginSearch() {
    // Reset everything to its original state
    this.setState({
      pathFound: false,
      stepsTaken: 0,
      giveUp: false,
      looping: false,
      invalidSearch: false,
      visitedLinks: []
    });

    // Begin the actual search
    this.searchWiki();
  }

  searchWiki() {
    const { query, stepsTaken, visitedLinks } = this.state;
    const linkArray = visitedLinks;
    // console.log('visitedLinks: ', visitedLinks);
    const URL = `https://en.wikipedia.org/w/api.php?action=parse&page=${query}&prop=text&origin=*&format=json`;

    // Check whether we found a path to philosophy
    if (query === 'Philosophy') {
      this.setState({ pathFound: true });
      return;

      // Check if we're stuck in an infinite loop
    } else if (visitedLinks.includes(query)) {
      this.setState({ looping: true });
      return;

      //  Give up if we don't find it in 100 steps
    } else if (stepsTaken === 50) {
      this.setState({ giveUp: true });
      return;

      //  If we didn't find a path, start a new search
    } else {
      axios
        .get(URL)
        .then(response => {
          // console.log('response: ', response);
          const textBody = Object.values(response.data.parse.text)[0];
          linkArray.push(query);
          this.setState({ textBody, visitedLinks: linkArray });
          this.parseWiki();
        })
        .catch(error => {
          this.setState({ invalidSearch: true });
          console.log('error: ', error);
        });
    }
  }

  parseWiki() {
    const { pathFound, textBody, stepsTaken, visitedLinks } = this.state;

    let link = '';

    // Make sure you're in the main body of the article
    let bodyStart = textBody.indexOf('<p>');
    let mainBody = textBody.slice(bodyStart);

    // Find the first link in the main body
    const linkStart = mainBody.indexOf('<a href="/wiki/');
    const linkStop = mainBody.indexOf('</a>');
    const firstParens = mainBody.indexOf(')');
    const fullLink = mainBody.slice(linkStart + 15, linkStop + 4);

    // Find the title of the link
    const titleStart = fullLink.indexOf('title=');
    for (let i = 0; i < fullLink.length; i++) {
      if (fullLink[i] === '"') {
        break;
      }
      link += fullLink[i];
    }

    // Format links that have multiple words
    link.replace(' ', '_');

    // Record our progress

    this.setState({
      query: link,
      stepsTaken: stepsTaken + 1
    });
    // console.log('link: ', link);
    this.searchWiki();
  }

  render() {
    const {
      pathFound,
      stepsTaken,
      giveUp,
      visitedLinks,
      looping,
      invalidSearch
    } = this.state;

    return (
      <div className="app">
        <div className="app-body">
          <div className="app-header">Path to Philosophy</div>
          <input
            className="search-bar"
            type="text"
            placeholder="Search Wikipedia"
            onChange={event => {
              this.setState({ query: event.target.value });
            }}
            value={this.state.query}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                this.beginSearch();
              }
            }}
          />
          <button className="search-button" onClick={() => this.beginSearch()}>
            Search
          </button>
          <ResultDisplay
            pathFound={pathFound}
            stepsTaken={stepsTaken}
            giveUp={giveUp}
            visitedLinks={visitedLinks}
            looping={looping}
            invalidSearch={invalidSearch}
          />
        </div>
      </div>
    );
  }
}

export default App;
