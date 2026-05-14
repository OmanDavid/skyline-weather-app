import { useState, useEffect } from 'react';
import CityList from '../components/CityList';

function Dashboard() {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const responses = await Promise.all(
          cities.map(async (city) => {
            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
            );

  return (
    <div className="page-container">
      <div className="hero-card">
        <h1>Modern Weather Dashboard</h1>
        <p>
          Skyline Weather delivers live forecasts and climate insights with a sleek Figma-inspired interface.
        </p>
      </div>

      <CityList cities={cities} setCities={setCities} />
    </div>
  );
}

export default Dashboard;
