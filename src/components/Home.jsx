import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddCard from './AddCard';
import Card from './Card';
import CreateCard from './CreateCard';

const Home = () => {
  const [cards, setCards] = useState([]);
  const [showCards, setShowCards] = useState(true);
  const [showCreateCard, setShowCreateCard] = useState(false);

  const fetchCards = (userId) => {
    axios
      .get('http://localhost:3000/cards', {
        withCredentials: true,
        params: { userId },
      })
      .then((response) => setCards(response.data))
      .catch((error) => console.log('Error fetching cards:', error));
  };

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    fetchCards(userId);
  }, []);

  const handleAddCardClick = () => {
    setShowCards(false);
    setShowCreateCard(true);
  };

  const handleCreateCardSubmit = () => {
    setShowCards(true);
    setShowCreateCard(false);
    const userId = JSON.parse(localStorage.getItem('userId'));
    fetchCards(userId);
  };

  return (
    <>
      <div>
        {showCreateCard ? (
          <CreateCard onSubmit={handleCreateCardSubmit} fetchCards={fetchCards} />
        ) : (
          <AddCard onClick={handleAddCardClick} />
        )}
      </div>

      <div>
        {showCards && (
          <>
            {cards.length > 0 ? (
              cards.map((card) => <Card key={card._id} data={card} />)
            ) : (
              <p>No cards found.</p>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Home;
