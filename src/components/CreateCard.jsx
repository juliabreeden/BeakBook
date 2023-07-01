import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const CreateCard = () => {
  const [species, setSpecies] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [birdWas, setBirdWas] = useState('What was the bird doing?');
  const [difficulty, setDifficulty] = useState('');
  const [submissionSuccessful, setSubmissionSuccessful] = useState(false);

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
      // onSubmit();
      
      setSpecies('');
      setDate('');
      setLocation('');
      setBirdWas('');
      setDifficulty('');
      setSubmissionSuccessful(true);
    } catch (error) {
      console.error('Error submitting card:', error);
    }
  };

  return (
    <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
    <div>
        {submissionSuccessful && 
        <p style={{fontFamily: 'Poppins', fontSize: '18px', marginBottom: '20px', maxWidth: '200px', textAlign: 'center'}}>
          Bird sighting saved! Submit another entry or view it in your sightings collection.
        </p>}
    </div>
      <form onSubmit={handleSubmit}
      style={{
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '20px',
          maxWidth: '800px'
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
        <button onClick={handleSubmit}type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateCard;
