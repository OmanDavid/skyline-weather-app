import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function WeatherCard({ city, cities, setCities }) {
  const navigate = useNavigate();

  // state to hold live weather data from OpenWeatherMap
  const [weather, setWeather] = useState(null);

  // fetch weather when the card loads using the city name
  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
    )
      .then(res => res.json())
      .then(data => {
        // store temperature and weather condition
        setWeather({
          temp: data.main.temp,
          condition: data.weather[0].description
        });
      })
      .catch(err => console.log('Weather fetch error:', err));
  }, [city.name]);

  function handleDelete() {
    fetch(`http://localhost:5000/cities/${city.id}`, {
      method: 'DELETE'
    }).then(() => {
      const updated = cities.filter(c => c.id !== city.id);
      setCities(updated);
    });
  }

  return (
    <div className="weather-card">
      <h2>{city.name}</h2>
      <p>{city.country}</p>

      {/* show live weather if available, otherwise show loading */}
      {weather ? (
        <div className="weather-details">
          <span>{weather.temp}°C</span>
          <p>{weather.condition}</p>
        </div>
      ) : (
        <p>Loading weather...</p>
      )}

      <p className="notes">{city.notes}</p>

      <div className="button-group">
        <button onClick={() => navigate(`/city/${city.id}`)}>View</button>
        <button className="delete-btn" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default WeatherCard;