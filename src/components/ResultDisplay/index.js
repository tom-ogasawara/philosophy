import React from 'react';

import LinkDisplay from '../LinkDisplay';
import './style.css';

const ResultDisplay = props => {
  const {
    stepsTaken,
    pathFound,
    looping,
    giveUp,
    invalidSearch,
    visitedLinks
  } = props;

  return (
    <div className="result-container">
      <LinkDisplay visitedLinks={visitedLinks} />
      <div className="result-info">
        <div className={pathFound ? 'success' : 'hidden'}>
          A path was found after {stepsTaken} steps!
        </div>
        <div className={looping && stepsTaken > 0 ? 'warning' : 'hidden'}>
          Caught in an infinite loop after {stepsTaken} steps!
        </div>
        <div className={giveUp ? 'warning' : 'hidden'}>
          Maximum iterations exceeded after {stepsTaken} steps!
        </div>
        <div className={invalidSearch ? 'warning' : 'hidden'}>
          Invalid search encountered, please try again.
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
