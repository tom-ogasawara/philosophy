import React, { Component } from 'react';
import './style.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      textBody: '',
      stepsTaken: 0,
      pathFound: false,
      giveUp: false
    };
  }

  searchWiki() {
    const { query, stepsTaken, giveUp }= this.state;
    const URL = `https://en.wikipedia.org/w/api.php?action=parse&page=${query}&prop=text&origin=*&format=json`;
   
    // Check whether we found a path to philosophy
    if (query === 'Philosophy') {
      this.setState({ pathFound: true });
      console.log('pathFound: ', this.state.pathFound);
      return;

    //  Give up if we don't find it in 100 steps
    } else if (stepsTaken > 100) {
      this.setState({ giveUp: true });
      return;

    //  If we didn't find a path, start a new search
    } else {
      axios
        .get(URL)
        .then(response => {
          console.log('response: ', response);
          const textBody = Object.values(response.data.parse.text)[0];
          this.setState({ textBody });
          this.parseWiki();
        })
        .catch(error => {
          console.log('error: ', error);
        });
    }
  }

  parseWiki() {
    const { pathFound, textBody, stepsTaken } = this.state;
    let link = '';

    // Make sure you're in the main body of the article
    let bodyStart = textBody.indexOf('<p>');
    // let bodyStop = textBody.indexOf('</p>');
    let mainBody = textBody.slice(bodyStart);

    // if (!mainBody.includes('<a href=')) {
    //   mainBody = textBody.slice(bodyStop + 1);
    //   bodyStart = mainBody.indexOf('<p>');
    //   bodyStop = mainBody.indexOf('</p>');
    //   mainBody = mainBody.slice(bodyStart, bodyStop);
    //   console.log("WOAH");
    // }

    // Find the first link in the main body
    const linkStart = mainBody.indexOf('<a href="/wiki/');
    const linkStop = mainBody.indexOf('</a>');
    const firstParens = mainBody.indexOf(')');
    // if (firstParens < linkStart) {

    // }

    const fullLink = mainBody.slice(linkStart + 15, linkStop + 4);
    console.log('fullLink: ', fullLink);
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
    this.setState({ query: link, stepsTaken: stepsTaken + 1 });
    console.log('link: ', link);
    this.searchWiki();
  }

  render() {
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
            onKeyPress={event => {
              if (event.key === 'Enter') {
                this.searchWiki();
              }
            }}
          />
          <button className="search-button" onClick={() => this.searchWiki()}>
            Search
          </button>
        </div>
      </div>
    );
  }
}

export default App;

//  value={this.state.query}
