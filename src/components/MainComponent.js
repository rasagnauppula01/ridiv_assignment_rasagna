import React, { useState, useEffect, useCallback } from 'react';
import SearchComponent from './SearchComponent';
import WeatherDisplayComponent from './WeatherDisplayComponent';
import ForecastComponent from './ForecastComponent';
import FavoriteComponent from './FavoriteComponent';
import axios from 'axios';

const DEFAULT_CITY = 'Hyderabad';

function MainComponent() {
  const [city, setCity] = useState(localStorage.getItem('lastSearchedCity') || DEFAULT_CITY);
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [unit, setUnit] = useState(localStorage.getItem('unit') || 'metric'); 
  const [favorites, setFavorites] = useState([]);

  const fetchWeatherAndForecast = async (city, unit) => {
    try {
      const apiKey = 'f134f1e06a211f115a8aeffaa3730d2c';
      const [weatherResponse, forecastResponse] = await Promise.all([
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`),
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}`)
      ]);
      setWeatherData(weatherResponse.data);
      setForecastData(forecastResponse.data);
    } catch (error) {
      console.error('Error fetching weather and forecast data', error);
    }
  };

  useEffect(() => {
    fetchWeatherAndForecast(city, unit);
  }, [city, unit]);

  const handleSearch = (searchedCity, weatherData) => {
    setCity(searchedCity);
    setWeatherData(weatherData);
    localStorage.setItem('lastSearchedCity', searchedCity);
  };

  const handleFavoritesUpdate = useCallback((favorites) => {
    setFavorites(favorites);
  }, []);

  const handleUnitToggle = () => {
    const newUnit = unit === 'metric' ? 'imperial' : 'metric';
    setUnit(newUnit);
    localStorage.setItem('unit', newUnit);
    fetchWeatherAndForecast(city, newUnit);
  };

  return (
    <div className="main-container">
      <h1>Weather Dashboarder</h1>
      <button onClick={handleUnitToggle} style={{width:"10%", height:"15%", backgroundColor:"lightblue"}}>
        Switch to {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}
      </button>
      <SearchComponent onSearch={handleSearch} />
      {weatherData && (
        <>
          <WeatherDisplayComponent city={city} weatherData={weatherData} unit={unit} />
          <ForecastComponent forecastData={forecastData} unit={unit} />
        </>
      )}
      <FavoriteComponent favorites={favorites} onFavoritesUpdate={handleFavoritesUpdate} />
    </div>
  );
}

export default MainComponent;









