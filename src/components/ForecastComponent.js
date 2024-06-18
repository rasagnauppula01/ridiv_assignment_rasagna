import React from 'react';
import './ForecastComponent.css';

function ForecastComponent({ forecastData, unit }) {
  if (!forecastData) return null;

  const temperatureUnit = unit === 'metric' ? '°C' : '°F';

  // Assuming forecastData.list contains the forecast for each 3-hour interval
  const dailyForecasts = forecastData.list.filter((data, index) => index % 8 === 0); 

  return (
    <div className="forecast-container">
      <h2>5-Day Forecast</h2>
      <div className="forecast-list">
        {dailyForecasts.map((forecast, index) => (
          <div key={index} className="forecast-item">
            <p>Date: {forecast.dt_txt}</p>
            <p>Temperature: {forecast.main.temp} {temperatureUnit}</p>
            <p>Humidity: {forecast.main.humidity}%</p>
            <p>Wind: {forecast.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForecastComponent;
