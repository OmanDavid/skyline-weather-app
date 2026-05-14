
import { useState } from 'react';
import WeatherCard from '../components/WeatherCard';

function AddCity() {
  const [query, setQuery] = useState('');
  const [city, setCity] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!query) {
      setError('Please enter a city name.');
      return;
    }

    try {
      setError('');

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
      );

      const data = await response.json();

      if (data.cod !== 200) {
        setError('City not found.');
        setCity(null);
        return;
      }

      setCity({
        name: data.name,
        country: data.sys.country,
        temp: data.main.temp,
        condition: data.weather[0].main,
        humidity: data.main.humidity,
        wind: data.wind.speed
      });
    } catch (err) {
      setError('Unable to fetch weather data.');
    }
  };

  return (
    <div className="page-container">
      <div className="hero-card">
        <h1>Search Any City</h1>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button onClick={handleSearch}>
            Search
          </button>
        </div>

        {error && <p className="error">{error}</p>}
      </div>

      {city && (
        <div className="weather-grid">
          <WeatherCard city={city} />
        </div>
      )}
    </div>
  );
}

export default AddCity;
