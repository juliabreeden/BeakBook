import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateCard from './CreateCard';
import EditCard from './EditCard';

const Card = () => {
  const [cards, setCards] = useState([]);
  const [showCreateCard, setShowCreateCard] = useState(false);
  const [editCardId, setEditCardId] = useState(null);

 
  const cardStyle = {
    width: '300px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '20px',
    background: 'radial-gradient(circle at right bottom, #ffe0c2 , #c2ffff)',
  };

  const cardContainerStyle = {
    display: 'grid',
    gridTemplateColumns: '10 rem 10 rem 10 rem',
    gridGap: '1 rem',
    gridAutoFlow: 'row'

  };

  const buttonStyle = {
    cursor: 'pointer', 
    height: '35px', 
    fontFamily: 'Poppins', 
    width: '200px',
    marginTop: '10px'
  };

  const fetchCards = (userId) => {
    axios
      .get('http://localhost:3000/cards', {
        withCredentials: true,
        params: { userId },
      })
      .then((response) => {
        setCards(response.data);
      })
      .catch((error) => console.log('Error fetching cards:', error));
  };

  useEffect(() => {
    // const userId = JSON.parse(localStorage.getItem('userId'));
    fetchCards();
  });

  const handleAddCardClick = () => {
    setShowCreateCard(true);
  };

  const handleCreateCardSubmit = () => {
    setShowCreateCard(false);
    const userId = JSON.parse(localStorage.getItem('userId'));
    fetchCards(userId);
  };

  const handleEditCardClick = (cardId) => {
    setEditCardId(cardId);
  };

  const handleCancelEdit = () => {
    setEditCardId(null);
  };

  const handleCardUpdate = () => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    fetchCards(userId);
    setEditCardId(null);
  };

  // const handleDeleteCard = async (cardId) => {
  //   try {
  //     await axios.delete(`http://localhost:3000/cards/${cardId}`, {
  //       withCredentials: true,
  //     });
  //     const userId = JSON.parse(localStorage.getItem('userId'));
  //     fetchCards(userId);
  //   } catch (error) {
  //     console.error('Error deleting card:', error);
  //   }
  // };

  // const handleDeleteCard = async (cardId) => {
  //   try {
  //     await axios.delete(`http://localhost:3000/cards/${cardId}`, {
  //       withCredentials: true,
  //     });
  //     setCards((prevCards) => prevCards.filter((card) => card._id !== cardId));
  //   const userId = JSON.parse(localStorage.getItem('userId'));
  //   setTimeout(() => {
  //       fetchCards(userId);
  //     }, 100);
  //   } catch (error) {
  //     console.error('Error deleting card:', error);
  //   }
  // };

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
    <>
      {showCreateCard ? (
        <CreateCard onSubmit={handleCreateCardSubmit} />
      ) : (
        <button style={{buttonStyle}}onClick={handleAddCardClick}>Add Card</button>
      )}

      {!showCreateCard && !editCardId ? (
        cards.length > 0 ? (
          <div style={{cardContainerStyle}}>
          {cards.map((card) => (
            <div 
              key={card._id}
              style={{cardStyle}}
            >
              <p>{card.species}</p>
              <p>{card.date}</p>
              <p>{card.location}</p>
              <p>{card.birdWas}</p>
              <p>{card.difficulty}</p>
              <button style={{buttonStyle}}onClick={() => handleEditCardClick(card._id)}>Edit</button>
              <button style={{buttonStyle}}onClick={() => handleDeleteCard(card._id)}>Delete</button>
            </div>
          ))}
          </div>
        ) : (
          <p>No cards found.</p>
        )
      ) : null}

      {editCardId && (
        <EditCard
          cardData={cards.find((card) => card._id === editCardId)}
          onCancel={handleCancelEdit}
          onSubmit={handleCardUpdate}
        />
      )}
    </>
  );
};

export default Card;
