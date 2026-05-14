import { Link } from 'react-router-dom';

  // converts country code to full country name
  function getCountryName(code) {
    try {
      return new Intl.DisplayNames(['en'], { type: 'region' }).of(code);
    } catch {
      return code; // fallback to code if conversion fails
    }
  }

  return (
    <Link to={`/city/${city.name}`} className="weather-card">
      <h2>{city.name}</h2>
      <p>{getCountryName(city.country)}</p>

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
