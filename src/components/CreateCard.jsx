import React, { useState } from 'react';
import axios from 'axios';
import '../styles.css';
import { Link } from 'react-router-dom';
import heroBackground from './heroBackground.jpg';

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

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    textAlign: 'center',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '300px',
  };

  const inputIcon = {
    position: 'relative',
    display: 'inline-block',
    width: '200px',
    marginBottom: '15px',
    marginTop: '20px',
    alignSelf: 'center',
  };

  const inputStyle = {
    // paddingLeft: '30px',
    alignSelf: 'center',
    height: '30px',
    width: '100%',
    boxSizing: 'border-box',
    fontFamily: 'Poppins',
    width: '265px',

  }

  // const iconStyle = {
  //   position: 'absolute',
  //   display: 'block',
  //   left: '10px',
  //   top: '50%',
  //   transform: 'translateY(-50%)',
  //   pointerEvents: 'none',
  // }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'repeat',
        backgroundPosition: 'center right',
        height: '100vh',
        width: '100vw',
        flexDirection: 'column',
      }}
    >
       <p style={{color: 'white', fontSize: '20', fontFamily:'Poppins', textAlign: 'center', alignSelf: 'center'}}>Enter bird information below to create a new sighting.</p>
      <div style={{ 
        textAlign: 'center',
        alignItems: 'center',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
        margin: '10px',
        paddingTop: '20px',
        paddingBottom: '30px',
        paddingRight: '55px',
        // paddingLeft: '40px',
        background: 'radial-gradient(circle at right bottom, #ffe0c2 , #c2ffff)',
      }}>
        <div>
            {submissionSuccessful && 
            <p style={{alignSelf: 'center', fontFamily: 'Poppins', fontSize: '18px', marginBottom: '20px', maxWidth: '200px', textAlign: 'center', marginLeft: '75px'}}>
              Bird sighting saved! Submit another entry or <Link to="/birdCards" style={{color: 'blue'}}>view it in your sightings collection</Link>.
            </p>}
        </div>
        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={inputIcon}>
            <label htmlFor="species"></label>
            <input style={inputStyle} type="text" id="species" name="species" placeholder='What species does this bird belong to?' value={species} onChange={handleSpeciesChange} />
          </div>
          <div style={inputIcon}>
            <label htmlFor="date"></label>
            <input style={inputStyle} type="text" id="date" name="date" placeholder='What date did you spot this bird?' value={date} onChange={handleDateChange} />
          </div>
          <div style={inputIcon}>
            <select style={inputStyle} value={birdWas} name="birdWas" onChange={handleBirdWasChange}>
              <option disabled selected>
                What was the bird doing?
              </option>
              <option value="Eating at a feeder">Eating at a feeder</option>
              <option value="Swimming or wading">Swimming or wading</option>
              <option value="On the ground">On the ground</option>
              <option value="In trees or bushes">In trees or bushes</option>
              <option value="On a fence or wire">On a fence or wire</option>
              <option value="Soaring or flying">Soaring or flying</option>
            </select>
          </div>
          <div style={inputIcon}>
            <select style={inputStyle} value={difficulty} name="difficulty" onChange={handleDifficultyChange}>
              <option value="" disabled selected>
                How difficult was it to spot this bird?
              </option>
              <option value="Easy">Easy</option>
              <option value="Moderately Difficult">Moderately Difficult</option>
              <option value="Difficult">Difficult</option>
            </select>
          </div>
          <div style={buttonContainerStyle}>
          <button style={{cursor: 'pointer', height: '35px', fontFamily: 'Poppins', width: '200px', marginLeft: '45px', marginTop: '16px', border: 'none', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', }} type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCard;
