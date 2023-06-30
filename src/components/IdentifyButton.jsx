import React, { useState } from 'react';
import IdentifyBird from './IdentifyBird';

const IdentifyButton = () => {
  const [showIdentifyBird, setShowIdentifyBird] = useState(false);

  const handleButtonClick = () => {
    setShowIdentifyBird(true);
  };

  return (
    <div>
      {showIdentifyBird ? (
        <IdentifyBird />
      ) : (
        <button onClick={handleButtonClick}>Click to Identify Bird</button>
      )}
    </div>
  );
};

export default IdentifyButton;
