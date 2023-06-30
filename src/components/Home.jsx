
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
