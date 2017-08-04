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
    // const URL = `https://en.wikipedia.org/w/api.php?action=parse&format=json&origin=*&page=${this.state.query}&prop=text`
    const URL = `https://en.wikipedia.org/w/api.php?action=query&format=json&titles=${this.state.query}&prop=revisions&rvprop=content&origin=*`
    const BASE_URL = 'https://en.wikipedia.org/w/api.php?action=query&format=json&generator=search&origin=*&gsrsearch=';
    let FETCH_URL = `${BASE_URL}${this.state.query}`;

      // fetch(URL, {
       
      //   method: 'GET'
      // })
      //   .then(response => {
      //     console.log('response: ', response);
      //   });
    
        
    axios
      .get(URL)
      .then(function(response) {
        // console.log('response: ', response);
        if (response.data) {
          let articleBody = response.request.response;
          console.log('articleBody: ', articleBody);
        }
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
