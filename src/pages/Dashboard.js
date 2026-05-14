
import { useEffect, useState } from 'react';
import WeatherCard from '../components/WeatherCard';

const cities = ['Nairobi', 'London', 'Tokyo', 'New York'];

function Dashboard() {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const responses = await Promise.all(
          cities.map(async (city) => {
            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
            );

            const data = await response.json();

            return {
              name: data.name,
              country: data.sys.country,
              temp: data.main.temp,
              condition: data.weather[0].main,
              humidity: data.main.humidity,
              wind: data.wind.speed
            };
          })
        );

        setWeatherData(responses);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="page-container">
      <div className="hero-card">
        <h1>Modern Weather Dashboard</h1>
        <p>
          Skyline Weather delivers live forecasts and climate insights with a sleek Figma-inspired interface.
        </p>
      </div>

      <div className="weather-grid">
        {weatherData.map((city) => (
          <WeatherCard key={city.name} city={city} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
