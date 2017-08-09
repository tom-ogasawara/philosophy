import React from 'react';
import './style.css';

const ResultDisplay = (props) => {
  const { stepsTaken, pathFound, giveUp } = props; 

  return (
    <div className="result-container">
      <div className="result-background">
      <div className="result-content">
        {stepsTaken}
        {pathFound}
      </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
