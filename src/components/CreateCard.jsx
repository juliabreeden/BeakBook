import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const CreateCard = ({ onSubmit, fetchCards }) => {
  const [species, setSpecies] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [birdWas, setBirdWas] = useState('What was the bird doing?');
  const [difficulty, setDifficulty] = useState('');

  const handleSpeciesChange = (e) => {
    setSpecies(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleBirdWasChange = (e) => {
    e.persist();
    console.log(e);
    setBirdWas(e.target.value);
  };
  

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cardData = {
      species,
      date,
      birdWas,
      difficulty,
    };
    console.log('Card Data:', cardData);
    try {
      await axios.post('http://localhost:3000/createCard', cardData, {
        withCredentials: true,
      });
    
    //   onSubmit();
    //   fetchCards();
    onSubmit();
    fetchCards();
    setSpecies('');
    setDate('');
    setLocation('');
    setBirdWas('');
    setDifficulty('');
    } catch (error) {
      console.error('Error submitting card:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}
      style={{
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '20px',
        }}
      >
        <input
          type="text"
          value={species}
          onChange={handleSpeciesChange}
          placeholder="What species does this bird belong to?"
        />
        <input
          type="text"
          value={date}
          onChange={handleDateChange}
          placeholder="What date did you spot this bird?"
        />
          {/* <input
            type="text"
            name="location"
            value={location}
            onChange={handleLocationChange}
            placeholder="Where did you spot this bird?"
/> */}
        <select
          value={birdWas}
          name="birdWas"
          onChange={handleBirdWasChange}
          style={{
            color: '#999',
            fontSize: '16px',
            fontFamily: 'Arial, sans-serif',
            borderRadius: '4px',
            padding: '8px',
            margin: '8px 0',
          }}
        >
          <option disabled>
            What was the bird doing?
          </option>
          <option value="Eating at a feeder">Eating at a feeder</option>
          <option value="Swimming or wading">Swimming or wading</option>
          <option value="On the ground">On the ground</option>
          <option value="In trees or bushes">In trees or bushes</option>
          <option value="On a fence or wire">On a fence or wire</option>
          <option value="Soaring or flying">Soaring or flying</option>
        </select>
        <select
          value={difficulty}
          onChange={handleDifficultyChange}
          style={{
            color: '#999',
            fontSize: '16px',
            fontFamily: 'Arial, sans-serif',
      borderRadius: '4px',
            padding: '8px',
            margin: '8px 0',
          }}
        >
          <option value="" disabled>
            How difficult was it to spot this bird?
          </option>
          <option value="Easy">Easy</option>
          <option value="Moderately Difficult">Moderately Difficult</option>
          <option value="Difficult">Difficult</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateCard;

// import React, { useState } from 'react';
// import axios from 'axios';

// const CreateCard = ({ onSubmit, fetchCards }) => {
//   const [species, setSpecies] = useState('');
//   const [date, setDate] = useState('');
//   const [birdWas, setBirdWas] = useState('');
//   const [difficulty, setDifficulty] = useState('');

//   const handleSpeciesChange = (e) => {
//     setSpecies(e.target.value);
//   };

//   const handleDateChange = (e) => {
//     setDate(e.target.value);
//   };

//   const handleBirdWasChange = (e) => {
//     setBirdWas(e.target.value);
//   };

//   const handleDifficultyChange = (e) => {
//     setDifficulty(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const cardData = {
//       species,
//       date,
//       birdWas,
//       difficulty,
//     };

//     try {
//       await axios.post('http://localhost:3000/createCard', cardData, {
//         withCredentials: true,
//       });
//       onSubmit();
//       fetchCards();
//       setSpecies('');
//       setDate('');
//       setBirdWas('');
//       setDifficulty('');
//     } catch (error) {
//       console.error('Error submitting card:', error);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={species}
//           onChange={handleSpeciesChange}
//           placeholder="Species"
//         />
//         <input
//           type="text"
//           value={date}
//           onChange={handleDateChange}
//           placeholder="Date"
//         />
//         <select value={birdWas} onChange={handleBirdWasChange}>
//           <option value="" disabled>
//             What was the bird doing?
//           </option>
//           <option value="Eating at a feeder">Eating at a feeder</option>
//           <option value="Swimming or wading">Swimming or wading</option>
//           <option value="On the ground">On the ground</option>
//           <option value="In trees or bushes">In trees or bushes</option>
//           <option value="On a fence or wire">On a fence or wire</option>
//           <option value="Soaring or flying">Soaring or flying</option>
//         </select>
//         <select value={difficulty} onChange={handleDifficultyChange}>
//           <option value="" disabled>
//             How difficult was it to spot this bird?
//           </option>
//           <option value="Easy">Easy</option>
//           <option value="Moderately Difficult">Moderately Difficult</option>
//           <option value="Difficult">Difficult</option>
//         </select>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default CreateCard;
