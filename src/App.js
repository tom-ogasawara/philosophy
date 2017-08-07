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
    const URL = `https://en.wikipedia.org/w/api.php?action=parse&page=${this.state.query}&prop=text&origin=*&format=json`;
    let inLink = false;
    let linkComplete = false;
    let link = [];

    axios
      .get(URL)
      .then(response => {
        const textBody = Object.values(response.data.parse.text)[0];
        console.log('textBody: ', textBody);
      })
      .catch(function(error) {
        console.log('error: ', error);
      });

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
