import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: ''
    };
  }

  search() {
    const BASE_URL = 'https://en.wikipedia.org/w/api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json'
    let FETCH_URL = `${BASE_URL}${this.state.query}`;

    fetch(URL, {
      method: 'GET'
    })
      // .then(response => response.json())
      .then(json1 => {
        console.log('json1: ', json1);
      });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">Getting to Philosophy</div>
        <div className="search-bar">
          <div className="App-body">
            <input
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
            <div onClick={() => this.search()}>
              search
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
