import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function WeatherCard({ city, cities, setCities }) {
  const navigate = useNavigate();

  // state to hold live weather data
  const [weather, setWeather] = useState(null);

  // tracks if weather fetch failed
  const [error, setError] = useState(false);

  // fetch weather when card loads using city name
  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
    )
      .then(res => res.json())
      .then(data => {
        // only set weather if response is successful
        if (data.cod === 200) {
          setWeather({
            temp: data.main.temp,
            condition: data.weather[0].description
          });
        } else {
          // city not found or API error
          setError(true);
        }
      })
      // network or connection error
      .catch(() => setError(true));
  }, [city.name]);

  // delete city from json-server and update state
  function handleDelete() {
    fetch(`http://localhost:5000/cities/${city.id}`, {
      method: 'DELETE'
    }).then(() => {
      const updated = cities.filter(c => c.id !== city.id);
      setCities(updated);
    });
  }

  // converts country code to full country name
  function getCountryName(code) {
    try {
      return new Intl.DisplayNames(['en'], { type: 'region' }).of(code);
    } catch {
      return code;
    }
  }

  return (
    <div className="weather-card">
      <h2>{city.name}</h2>
      <p>{getCountryName(city.country)}</p>

      {/* show weather, error message or loading state */}
      {error ? (
        <p>Weather unavailable</p>
      ) : weather ? (
        <div className="weather-details">
          <span>{weather.temp}°C</span>
          <p>{weather.condition}</p>
        </div>
      ) : (
        <p>Loading weather...</p>
      )}

      <div className="button-group">
        <button className="view-btn" onClick={() => navigate(`/city/${city.id}`)}>View</button>
        <button className="delete-btn" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default WeatherCard;