import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: ''
    };
  }

  search() {
    const BASE_URL =
      'https://en.wikipedia.org/w/api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json';
    let FETCH_URL = `${BASE_URL}${this.state.query}`;

    //   fetch(FETCH_URL, {
    //     mode: 'cors',
    //     method: 'GET'
    //   })
    //     // .then(response => response.json())
    //     .then(json1 => {
    //       console.log('json1: ', json1);
    //     });
    // }

    axios
      .get(FETCH_URL)
      .then(function(response) {
        console.log('response: ', response);
      })
      .catch(function(error) {
        console.log('error: ', error);
      });
  }

  render() {
    return (
      <div className="app">
        <div className="app-header">Getting to Philosophy</div>
        <div className="app-body">
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
                this.search();
              }
            }}
          />
          <button className="search-button" onClick={() => this.search()}>
            search
          </button>
        </div>
      </div>
    );
  }
}

export default App;
