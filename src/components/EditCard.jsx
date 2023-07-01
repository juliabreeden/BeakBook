import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import heroBackground from './heroBackground.jpg';

const EditCard = ({ cardData, onCancel, onSubmit }) => {
  const [species, setSpecies] = useState(cardData.species);
  const [date, setDate] = useState(cardData.date);
  const [location, setLocation] = useState(cardData.location);
  const [birdWas, setBirdWas] = useState(cardData.birdWas);
  const [difficulty, setDifficulty] = useState(cardData.difficulty);

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

    const updatedCardData = {
      ...cardData,
      species,
      date,
      location,
      birdWas,
      difficulty,
    };

    try {
      const response = await axios.put(
        `http://localhost:3000/cards/${cardData._id}`,
        updatedCardData,
        {
          withCredentials: true,
        }
      );
      onSubmit();
    } catch (error) {
      console.error('Error updating card:', error);
    }
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #ccc',
    width: '300px',
    borderRadius: '4px',
    padding: '20px',
    justifyContent: 'center',
    background: 'radial-gradient(circle at right bottom, #ffe0c2 , #c2ffff)',
  };

  const inputStyle = {
    margin: '10px',
  };

  const selectStyle = {
    width: '93%',
    alignSelf: 'center',
    margin: '10px',
    borderRadius: '4px',
  };

  const buttonStyle = {
    margin: '10px',
  };

  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center',    backgroundImage: `url(${heroBackground})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'repeat',
    backgroundPosition: 'center right',
    height: '100vh',
    width: '100vw'}}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          value={species}
          onChange={handleSpeciesChange}
          placeholder="Species"
          style={inputStyle}
        />
        <input
          type="text"
          value={date}
          onChange={handleDateChange}
          placeholder="Date"
          style={inputStyle}
        />
        {/* <input
          type="text"
          value={location}
          onChange={handleLocationChange}
          placeholder="Location"
          style={inputStyle}
        /> */}
        <select
          value={birdWas}
          onChange={handleBirdWasChange}
          style={selectStyle}
        >
          <option value="" disabled>
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
          style={selectStyle}
        >
          <option value="" disabled>
            How difficult was it to spot this bird?
          </option>
          <option value="Easy">Easy</option>
          <option value="Moderately Difficult">Moderately Difficult</option>
          <option value="Difficult">Difficult</option>
        </select>
        <button type="submit" style={buttonStyle}>
          Save
        </button>
        <button type="button" onClick={onCancel} style={buttonStyle}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditCard;
