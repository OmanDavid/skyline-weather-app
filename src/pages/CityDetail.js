
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function CityDetail() {
  const { name } = useParams();
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchCityWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
        );

        const data = await response.json();

        setWeather(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCityWeather();
  }, [name]);

  if (!weather || !weather.main) {
    return (
      <div className="page-container">
        <div className="hero-card">
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="hero-card">
        <h1>{weather.name}</h1>
        <p>{weather.weather[0].description}</p>

        <div className="weather-temp">
          {Math.round(weather.main.temp)}°C
        </div>
      </div>

      <div className="detail-card">
        <h2>Weather Details</h2>

        <div className="detail-grid">
          <div className="metric">
            <h4>Humidity</h4>
            <p>{weather.main.humidity}%</p>
          </div>

          <div className="metric">
            <h4>Wind Speed</h4>
            <p>{weather.wind.speed} km/h</p>
          </div>

          <div className="metric">
            <h4>Feels Like</h4>
            <p>{Math.round(weather.main.feels_like)}°C</p>
          </div>

          <div className="metric">
            <h4>Pressure</h4>
            <p>{weather.main.pressure} hPa</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CityDetail;
