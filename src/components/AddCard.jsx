import React from "react";
import App from "./App";
import Home from './Home';
import CreateCard from './CreateCard';
import { useState } from 'react';


const AddCard = () => {
  const [showCreateCard, setShowCreateCard] = useState(false);

  function handleClick() {
    setShowCreateCard(true);
  }
    return (
      <div>
      {showCreateCard ? (
        <CreateCard />
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
        cursor: 'pointer'
      }}
      onClick = {handleClick}
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
    )
}

export default AddCard;