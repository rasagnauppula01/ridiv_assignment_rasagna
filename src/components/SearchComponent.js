import React, { useState } from 'react';
import axios from 'axios';
import './SearchComponent.css';

function SearchComponent({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      console.error('Search query cannot be empty');
      return;
    }

    try {
      const apiKey = 'f134f1e06a211f115a8aeffaa3730d2c';
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=${apiKey}&units=metric`
      );
      onSearch(searchQuery, response.data);
      setSearchQuery('');
    } catch (error) {
      console.error('Error fetching weather data', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request made but no response received', error.request);
      } else {
        console.error('Error setting up request', error.message);
      }
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for a city"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchComponent;
