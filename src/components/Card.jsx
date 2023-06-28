import React from "react";
import App from "./App";
import CreateCard from './CreateCard';


const Card = ({ data }) => {
    return (
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
            }}
        >
      <div
        style={{
            border: '1px solid #ccc',
            width: '300px',
            margin: '10px',
            textAlign: 'center',
        }}
      >
       <p> {data.species} </p>
       <p> {data.date}</p>
       <p> {data.location}</p>
       <p> {data.birdWas}</p>
       <p> {data.difficulty}</p>
      </div>
      </div>
    );
  };

export default Card;