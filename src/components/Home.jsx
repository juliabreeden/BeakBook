import axios from 'axios';
import AddCard from './AddCard';
import Card from './Card';
import CreateCard from './CreateCard';
import EditCard from './EditCard';
import React, { useState, useEffect } from 'react';

const Home = () => {
  const [cards, setCards] = useState([]);
  const [showCreateCard, setShowCreateCard] = useState(false);
  const [editCardId, setEditCardId] = useState(null);

  const fetchCards =  (userId) => {
    axios
      .get('http://localhost:3000/cards', {
        withCredentials: true,
        params: { userId },
      })
      .then((response) => setCards(response.data))
      .catch((error) => console.log('Error fetching cards:', error));
  };

// const fetchCards = (userId) => {
//     axios
//       .get('http://localhost:3000/cards', {
//         withCredentials: true,
//         params: { userId },
//       })
//       .then((response) => {
//         setCards(response.data);
//       })
//       .catch((error) => console.log('Error fetching cards:', error));
//   };
  

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    fetchCards(userId);
  }, []);

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
      const userId = JSON.parse(localStorage.getItem('userId'));
      fetchCards(userId);
    } catch (error) {
      console.error('Error deleting card:', error);
    }
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
        {!showCreateCard && !editCardId ? (
          <>
            {cards.length > 0 ? (
              cards.map((card) => (
                <Card key={card._id} data={card} onEdit={handleEditCardClick} fetchCards={fetchCards} />
              ))
            ) : (
              <p>No cards found.</p>
            )}
          </>
        ) : null}
      </div>

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

export default Home;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Card from './Card';

// const Home = () => {
//   const [cards, setCards] = useState([]);

//   useEffect(() => {
//     fetchCards();
//   }, []);

//   const fetchCards = () => {
//     axios
//       .get('http://localhost:3000/cards', {
//         withCredentials: true,
//       })
//       .then((response) => setCards(response.data))
//       .catch((error) => console.log('Error fetching cards:', error));
//   };

//   const handleDeleteCard = (cardId) => {
//     setCards((prevCards) => prevCards.filter((card) => card._id !== cardId));
//   };

//   return (
//     <div>
//       {cards.length > 0 ? (
//         cards.map((card) => (
//           <Card key={card._id} data={card} onDelete={handleDeleteCard} onEdit={handleEditCard} />
//         ))
//       ) : (
//         <p>No cards found.</p>
//       )}
//     </div>
//   );
// };

// export default Home;
