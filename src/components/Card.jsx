import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Card = () => {
  const [cards, setCards] = useState([]);
  const [showCreateCard, setShowCreateCard] = useState(false);
  const [editCardId, setEditCardId] = useState(null);

  const cardStyle = {
    textAlign: 'center',
    width: '300px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '20px',
    marginBottom: '1rem',
    background: 'radial-gradient(circle at right bottom, #ffe0c2 , #c2ffff)',
    boxSizing: 'border-box',
    margin: '0 auto',
    fontFamily: 'Poppins',
  };

  const cardContainerStyle = {
    paddingTop: '50px',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gridGap: '1rem',
    justifyContent: 'center',
    alignItems: 'stretch',
  };

  const buttonStyle = {
    cursor: 'pointer',
    height: '35px',
    fontFamily: 'Poppins',
    width: '157px',
    marginTop: '10px',
  };

  const boldText = {
    fontWeight: 'bold',
    fontFamily: 'Lato',
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

  const handleDeleteCard = async (cardId) => {
    try {
      await axios.delete(`http://localhost:3000/cards/${cardId}`, {
        withCredentials: true,
      });
      setCards((prevCards) =>
        prevCards.filter((card) => card._id !== cardId)
      );
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
      {!showCreateCard && !editCardId && cards.length === 0 && (
        <p style={{ textAlign: 'center', paddingTop: '70px' }}>
          Looks like you don't have any sightings logged yet.{' '}
          <Link to="/create">Create a new sighting</Link>.
        </p>
      )}

      {!showCreateCard && !editCardId && cards.length > 0 && (
        <div style={cardContainerStyle}>
          {cards.map((card) => (
            <div key={card._id} style={cardStyle}>
              <p>
                <span style={boldText}>Species identified:</span>{' '}
                <span>{card.species}</span>
              </p>
              <p>
                <span style={boldText}>Date spotted:</span>{' '}
                <span>{card.date}</span>
              </p>
              <p>
                <span style={boldText}>Bird was seen:</span>{' '}
                <span>{card.birdWas}</span>
              </p>
              <p>
                <span style={boldText}>Difficulty:</span>{' '}
                <span>{card.difficulty}</span>
              </p>
              <button
                style={buttonStyle}
                onClick={() => handleEditCardClick(card._id)}
              >
                Edit
              </button>
              <button
                style={buttonStyle}
                onClick={() => handleDeleteCard(card._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
{/* 
      {showCreateCard ? (
        <CreateCard onSubmit={handleCreateCardSubmit} />
      ) : (
        !editCardId && (
          <button style={buttonStyle} onClick={handleAddCardClick}>
            Add Card
          </button>
        )
      )} */}

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
