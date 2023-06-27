import React, { useState } from 'react';
import axios from 'axios';
import Card from './Card';

const CreateCard = () => {
  const [species, setSpecies] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [birdWas, setBirdWas] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [cardData, setCardData] = useState(null);

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
    setBirdWas(e.target.value);
  };

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    console.log('create card submit button pressed');
    const cardData = {
      species,
      date,
      location,
      birdWas,
      difficulty,
    };

    try {
      const response = await axios.post('/createCard', cardData, {
        withCredentials: true, // Include cookies in the request
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
      });
      setCardData(response.data);
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting card:', error);
    }
  };

  if (submitted) {
    return <Card cardData={cardData} />;
  }

  return (
    <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
  >
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
        <select
          value={location}
          onChange={handleLocationChange}
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
            Select bird location
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
    </div>
  );
};

export default CreateCard;
