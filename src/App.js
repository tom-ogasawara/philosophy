import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      textBody: '',
      stepsTaken: 0,
      pathFound: false
    };
  }

  searchWiki() {
    const URL = `https://en.wikipedia.org/w/api.php?action=parse&page=${this.state.query}&prop=text&origin=*&format=json`;

    axios
      .get(URL)
      .then(response => {
        const textBody = Object.values(response.data.parse.text)[0];
        this.setState({ textBody });
        this.parseWiki();
      })
      .catch(error => {
        console.log('error: ', error);
      });
  }

  parseWiki() {
    const { pathFound, textBody } = this.state;
    let inBody = false;
    let inLink = false;
    let linkComplete = false;
    let link = '';
    
    // while (pathFound === false) {
    //   for (let i = 0; i++; i < textBody.length) {
    //     if (textBody[i] === "<" && textBody[i + 1] === "p") {
    //       inBody = true;
    //     }
    //     if (inBody && textBody[i] === '<' && textBody[i + 1] === "a") {
    //       inLink = true;
    //     }
    //     if (inLink) {

    //     }
    //   }
    // break;
    // }
    const parseStart = textBody.indexOf('<p>');  
    const parseStop = textBody.indexOf('</p>');
    const mainBody = textBody.slice(parseStart, parseStop);
    console.log('mainBody: ', mainBody);
    
  }

  render() {
    return (
      <div className="app">
        <div className="app-body">
          <div className="app-header">Getting to Philosophy</div>
          <input
            className="search-bar"
            type="text"
            placeholder="Search Wikipedia"
            value={this.state.query}
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
