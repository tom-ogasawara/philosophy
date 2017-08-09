import React from 'react';
import './style.css';
import LinkDisplay from '../LinkDisplay';

const ResultDisplay = props => {
  const { stepsTaken, pathFound, giveUp, visitedLinks } = props;

  return (
    <div className="result-container">
      <div className="result-background">
        <div className="result-content">
          Steps Taken: {stepsTaken}
          <LinkDisplay visitedLinks={visitedLinks} />
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
