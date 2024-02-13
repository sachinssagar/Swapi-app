// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import "./App.css";

function StarWarsCharacters() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCharacters() {
      try {
        const response = await fetch("https://swapi.dev/api/people");
        if (!response.ok) {
          throw new Error(
            "Oops! Something went wrong. Please try again later."
          );
        }
        const data = await response.json();
        setCharacters(data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching characters:", error);
        setError(error.message);
        setLoading(false);
      }
    }

    fetchCharacters();
  }, []);

  // Search
  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="main-content">
      <h1 className="title">Star Wars Characters</h1>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <div className="character-cards">
            {filteredCharacters.map((character, index) => (
              <div
                key={index}
                className="character-card"
                style={{ backgroundColor: character.hair_color }}
              >
                <h2 className="character-name">{character.name}</h2>
                <img
                  className="character-image"
                  src={`https://picsum.photos/200/300?random=${index}`}
                  alt={`${character.name}`}
                />
                <p className="character-info">
                  Hair Color: {character.hair_color}
                </p>
                <p className="character-info">
                  Skin Color: {character.skin_color}
                </p>
                <p className="character-info">Gender: {character.gender}</p>
                <p className="character-info">
                  Number of Vehicles: {character.vehicles.length}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default StarWarsCharacters;
