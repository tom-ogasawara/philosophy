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
      looping: false,
      giveUp: false,
      invalidSearch: false,
      visitedLinks: []
    };

    // this.extractContent = this.extractContent.bind(this);
  }

  beginSearch() {
    // Reset everything to its original state
    this.setState({
      pathFound: false,
      stepsTaken: 0,
      looping: false,
      giveUp: false,
      invalidSearch: false,
      visitedLinks: []
    });

    // Begin the actual search
    this.searchWiki();
  }

  searchWiki() {
    const { query, stepsTaken, visitedLinks } = this.state;
    const linkArray = visitedLinks;
    const URL = `https://en.wikipedia.org/w/api.php?action=parse&page=${query}&prop=text&origin=*&format=json`;

    // Check whether we found a path to philosophy
    if (query === 'Philosophy') {
      this.setState({ pathFound: true });
      return;

      // Check if we're stuck in an infinite loop
    } else if (visitedLinks.includes(query)) {
      this.setState({ looping: true });
      return;

      //  Give up if we don't find it after 50 steps
    } else if (stepsTaken === 50) {
      this.setState({ giveUp: true });
      return;

      //  If we didn't find a path, start a new search
    } else {
      axios
        .get(URL)
        .then(response => {
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

  extractContent() {
    const textBody = this.state.textBody;
    let extractedBody = '';
    let inItalics = false;
    let inTable = false;
    // let inLink = false;
    // let inParens = false;
    // let parensCount = 0;

    for (let i = 0; i < textBody.length; i++) {
      // Check if you're between <i></i> tags
      if (
        textBody[i] === '<' &&
        textBody[i + 1] === 'i' &&
        textBody[i + 2] === '>'
      ) {
        inItalics = true;
      }
      if (
        textBody[i] === '<' &&
        textBody[i + 1] === '/' &&
        textBody[i + 2] === 'i' &&
        textBody[i + 3] === '>'
      ) {
        inItalics = false;
      }

      // Check if you're between <table></table> tags
      if (
        textBody[i] === '<' &&
        textBody[i + 1] === 't' &&
        textBody[i + 2] === 'a' &&
        textBody[i + 3] === 'b' &&
        textBody[i + 4] === 'l'
      ) {
        inTable = true;
      }
      if (
        textBody[i] === '<' &&
        textBody[i + 1] === '/' &&
        textBody[i + 2] === 't' &&
        textBody[i + 3] === 'a' &&
        textBody[i + 4] === 'b' &&
        textBody[i + 5] === 'l'
      ) {
        inTable = false;
      }

      // Check if you're between <a></a> tags
      // if (
      //   textBody[i] === '<' &&
      //   textBody[i + 1] === 'a' &&
      //   textBody[i + 2] === ' '
      // ) {
      //   inLink = true;
      // }
      // if (
      //   textBody[i] === '(<)' &&
      //   textBody[i + 1] === '/' &&
      //   textBody[i + 2] === 'a' &&
      //   textBody[i + 3] === '>'
      // ) {
      //   inLink = false;
      // }

      // Check if you're between parentheses
      // if (textBody[i] === '(' && !inLink) {
      //   parensCount++;
      // }
      // if (textBody[i] === ')' && !inLink) {
      //   parensCount--;
      // }

      // Extract desired text
      if (!inItalics && !inTable) {
        extractedBody += textBody[i];
      }
    }

    return extractedBody;
  }

  findLink(mainBody) {
    // Find the first link in the main body
    const linkStart = mainBody.indexOf('<a href="/wiki/');
    const linkStop = mainBody.indexOf('</a>');
    let fullLink = mainBody.slice(linkStart + 15, linkStop + 4);
    return fullLink;
  }

  parseWiki() {
    const { pathFound, textBody, stepsTaken, visitedLinks } = this.state;
    const extractedBody = this.extractContent();
    let link = '';

    // Make sure you're in the main body of the article
    let bodyStart = extractedBody.indexOf('<p>');
    let mainBody = extractedBody.slice(bodyStart);

    // Find the first link in the main body
    let linkStart = mainBody.indexOf('<a href="/wiki/');
    let fullLink = mainBody.slice(linkStart + 15, linkStart + 100);
    console.log('fullLink: ', fullLink);
    if (fullLink.includes(':')) {
      mainBody = mainBody.slice(linkStart + 25);
      linkStart = mainBody.indexOf('<a href="/wiki/');
      fullLink = mainBody.slice(linkStart + 15, linkStart + 100);
      // console.log('mainBody: ', mainBody)
    }

    // Find the title of the link
    for (let i = 0; i < fullLink.length; i++) {
      if (fullLink[i] === '"') {
        break;
      }
      link += fullLink[i];
    }

    // Record our progress
    this.setState({
      query: link,
      stepsTaken: stepsTaken + 1
    });
    // console.log('extractedBody: ', extractedBody);
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
          <div className="app-title">Path to Philosophy</div>
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