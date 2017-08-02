import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './App.css';
import './reset.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sequence: null,
      sequenceLength: 0,
      features: []
    };
  }

  search() {
    const URL = 'https://teselagen.com/getSequence';

    fetch(URL, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(json => {
        const sequence = json.sequence;
        const sequenceLength = json.sequenceLength;
        const features = json.features;

        this.setState({
          sequence,
          sequenceLength,
          features
        });
      });
  }

  renderLabel() {
    return (
      <div className="plasmid-label">
        <div className="zero-bp-label">0 bp</div>
        <div className="zero-bp-label">|</div>
        <div className="plasmid-name">Plasmid X</div>
        <div className="sequence-length">
          {this.state.sequenceLength}00 bp
        </div>
      </div>
    );
  }

  renderFeatures() {
    const featureList = this.state.features;
    const featureDivs = [];

    for (let i = 0; i < this.state.features.length; i++) {
      let degrees = featureList[i].index / this.state.sequenceLength * 360;
      let rotate = { transform: `rotate(${degrees}deg)` };
      let align = { transform: `rotate(-${degrees}deg)` };

      featureDivs.push(
        <div className="feature" key={i} style={rotate}>
          <div className="feature-label" style={align}>
            {featureList[i].name} <br />
            {featureList[i].index}00 bp <br />
          </div>
          <br />
          <br />|
        </div>
      );
    }

    return featureDivs;
  }

  renderSequence() {
    return (
      <div className="sequence">
        Sequence: <br />
        {this.state.sequence}
      </div>
    );
  }

  render() {
    return (
      <div className="app">
        <div className="outer-container">
          <div className="container">
            <div className="app-title">Plasmid Visualization</div>
            <div className="inner-container">
              <Button
                className="search-button"
                onClick={() => this.search()}
                bsStyle="primary"
                bsSize="large"
              >
                Load New Plasmid
              </Button>
              {this.state.sequence !== null
                ? <div className="visualization">
                    <div className="data">
                      <div className="circle" />
                      {this.renderLabel()}
                      {this.renderFeatures()}
                    </div>
                  </div>
                : <div />}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
