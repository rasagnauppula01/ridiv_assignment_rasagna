import React from 'react';
import './WeatherDisplayComponent.css';
import cloud from "../cloud.png";

function WeatherDisplayComponent({ city, weatherData, unit }) {
  if (!weatherData) return null;

  const temperatureUnit = unit === 'metric' ? '°C' : '°F';

  return (
    <div className="weather-container">
      <h2>{city}</h2>
      <div className="weather-icon">
        <img src={cloud} alt="weather icon" />
      </div>
      <p>Temperature: {weatherData.main.temp} {temperatureUnit}</p>
      <p>Humidity: {weatherData.main.humidity}%</p>
      <p>Wind: {weatherData.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}</p>
    </div>
  );
}

export default WeatherDisplayComponent;
