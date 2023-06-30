

import React, { useState } from 'react';
import axios from 'axios';

const IdentifyBird = () => {
 
  const [showForm, setShowForm] = useState(true);

  const [location, setLocation] = useState('');
  const [size, setSize] = useState('');
  const [colors, setColors] = useState('');
  const [birdWas, setBirdWas] = useState('');
  const [responseText, setResponseText] = useState('');

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const handleColorsChange = (e) => {
    setColors(e.target.value);
  };

  const handleBirdWasChange = (e) => {
    setBirdWas(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('identify submit button pressed');

    const data = {
      location,
      size,
      colors,
      birdWas,
    };

    try {
      const response = await axios.post('http://localhost:3000/chat', data, {
        withCredentials: true,
      });

      setResponseText(response.data); // Store the response in component state
      setShowForm(false); // Hide the form now that we have a response
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  if (showForm) {
    return (
      <div>
          <form
        onSubmit={handleSubmit}
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
          value={location}
          onChange={handleLocationChange}
          placeholder="Location (City/Town, State/Province, Country)"
          style={{
            margin: '10px',
          }}
        />
        <select
          value={size}
          onChange={handleSizeChange}
          style={{
            width: '93%',
            alignSelf: 'center',
            margin: '10px',
            borderRadius: '4px',
          }}
        >
          <option value="" disabled>
            Size
          </option>
          <option value="sparrow sized or smaller">Sparrow sized or smaller</option>
          <option value="between sparrow and robbin">Between sparrow and robin</option>
          <option value="robin-sized">Robin-sized</option>
          <option value="between robin and crow">Between robin and crow</option>
          <option value="crow-sized">Crow-sized</option>
          <option value="between crow and goose">Between crow and goose</option>
          <option value="goose-sized or larger">Goose-sized or larger</option>
        </select>
        <input
          type="text"
          value={colors}
          onChange={handleColorsChange}
          placeholder="Main colors (color1, color 2, color3)"
          style={{
            margin: '10px',
          }}
        />
        <select
          value={birdWas}
          onChange={handleBirdWasChange}
          style={{
            width: '93%',
            alignSelf: 'center',
            margin: '10px',
            borderRadius: '4px',
          }}
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
       

        <button type="submit">Submit</button>
      </form>
      </div>
    );
  } else {
    return (
      <div style={{ display: 'flex', flexDirection:'column', alignItems: 'center', marginTop: '20px', border: '1px solid black', padding: '10px', borderRadius: '4px' }}>
        <h3>Possible Birds:</h3>
        <p>{responseText}</p>
        <button onClick={() => setShowForm(true)}>New Identification</button>
      </div>
    );
  }
};

export default IdentifyBird;
