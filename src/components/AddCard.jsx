import React, { useState } from 'react';
import CreateCard from './CreateCard';

const AddCard = ({ onClick, onSubmit }) => {
  const [showCreateCard, setShowCreateCard] = useState(false);

  const handleClick = () => {
    setShowCreateCard(true);
    onClick(); // Call the onClick function passed from the Home component
  };

  const handleCreateCardSubmit = () => {
    setShowCreateCard(false);
    onSubmit(); // Call the onSubmit function passed from the Home component
  };

  return (
    <div>
      {showCreateCard ? (
        <CreateCard onSubmit={handleCreateCardSubmit} />
      ) : (
        <button
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: '#00a8e8',
            color: 'white',
            fontSize: '24px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={handleClick}
        >
          <span
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#333',
            }}
          >
            +
          </span>
        </button>
      )}
    </div>
  );
};

export default AddCard;
