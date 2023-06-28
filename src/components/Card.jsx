import React from "react";
import App from "./App";
import CreateCard from './CreateCard';
import { useState } from 'react';
import EditCard from './EditCard';
import axios from 'axios';


const Card = ({ data, onEdit, fetchCards }) => {

    const handleDeleteCard = async (cardId) => {
        try {
          await axios.delete(`http://localhost:3000/cards/${cardId}`, {
            withCredentials: true,
          });
          setCards((prevCards) => prevCards.filter((card) => card._id !== cardId));
        const userId = JSON.parse(localStorage.getItem('userId'));
        setTimeout(() => {
            fetchCards(userId);
          }, 100);
        } catch (error) {
          console.error('Error deleting card:', error);
        }
      };
      
  return (
<div 
  style={{
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '20px',
  }}
>    <div
         style={{ width: '100%' }}>

        <p> {data.species} </p>
        <p> {data.date} </p>
        <p> {data.location} </p>
        <p> {data.birdWas} </p>
        <p> {data.difficulty} </p>
      </div>
      <button onClick={() => onEdit(data._id)}>Edit</button>
      <button onClick={() => handleDeleteCard(data._id)}>Delete</button>

    </div>
  );
};

export default Card;

// import React from "react";
// import axios from 'axios';

// const Card = ({ data, onEdit, onDelete }) => {
//   const handleDeleteCard = async (cardId) => {
//     try {
//       await axios.delete(`http://localhost:3000/cards/${cardId}`, {
//         withCredentials: true,
//       });
//       onDelete(cardId); // Pass the cardId to the onDelete function in the Home component
//     } catch (error) {
//       console.error('Error deleting card:', error);
//     }
//   };

//   return (
//     <div>
//       <p> {data.species} </p>
//       <p> {data.date} </p>
//       <p> {data.location} </p>
//       <p> {data.birdWas} </p>
//       <p> {data.difficulty} </p>
//       <button onClick={() => onEdit(data._id)}>Edit</button>
//       <button onClick={() => handleDeleteCard(data._id)}>Delete</button>
//     </div>
//   );
// };

// export default Card;
