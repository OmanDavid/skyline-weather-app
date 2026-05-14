import { Link } from 'react-router-dom';

function WeatherCard({ city }) {
  return (
    <Link to={`/city/${city.name}`} className="weather-card">
      <h2>{city.name}</h2>
      <p>{city.country}</p>

      <div className="weather-temp">
        {Math.round(city.temp)}°C
      </div>

      <div className="weather-meta">
        <p>Condition: {city.condition}</p>
        <p>Humidity: {city.humidity}%</p>
        <p>Wind: {city.wind} km/h</p>
      </div>
    </Link>
  );
}

export default WeatherCard;
