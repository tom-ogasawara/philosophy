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
      <div className="result-info">
        <div className={stepsTaken > 0 && !pathFound && !looping && !giveUp && !invalidSearch ? 'in-progress' : 'hidden'}>
          Searching for a path...
        </div>
        <div className={pathFound ? 'success' : 'hidden'}>
          A path was found after {stepsTaken} steps!
        </div>
        <div
          className={looping && stepsTaken > 0 ? 'warning' : 'hidden'}
        >
          Caught in an infinite loop after {stepsTaken} steps!
        </div>
        <div className={giveUp ? 'warning' : 'hidden'}>
          Maximum iterations exceeded after 50 steps!
        </div>
        <div className={invalidSearch && stepsTaken === 0 ? 'warning' : 'hidden'}>
          Please enter a valid search term.
        </div>
      </div>
      <LinkDisplay visitedLinks={visitedLinks} />
    </div>
  );
};

export default ResultDisplay;
