import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function CityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [city, setCity] = useState({
    name: '',
    country: '',
    temperature: '',
    label: '',
    notes: ''
  });

  // state for live wweather data
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/cities/${id}`)
      .then((res) => res.json())
      .then((data) => setCity(data));
  }, [id]);

  // fetch live weather once city name is available
    useEffect(() => {
    if (city.name) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
      )
        .then(res => res.json())
        .then(data => {
          setWeather({
            temp: data.main.temp,
            condition: data.weather[0].description,
            humidity: data.main.humidity,
            wind: data.wind.speed
          });
        });
    }
  }, [city.name]);

  function handleChange(e) {
    setCity({ ...city, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch(`http://localhost:5000/cities/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(city)
    }).then(() => navigate('/'));
  }

  return (
    <div className="page-container">
      <div className="form-card">
        <h1>{city.name}</h1>
        <p>{city.country}</p>

        {/* live weather section */}
        {weather ? (
          <div className="weather-details">
            <p>{weather.temp}°C — {weather.condition}</p>
            <p>Humidity: {weather.humidity}%</p>
            <p>Wind: {weather.wind} m/s</p>
          </div>
        ) : (
          <p>Loading weather...</p>
        )}

         <form onSubmit={handleSubmit}>
          <input type="text" name="name" value={city.name} onChange={handleChange} />
          <input type="text" name="country" value={city.country} onChange={handleChange} />
          <input type="text" name="label" value={city.label} onChange={handleChange} />
          <textarea name="notes" value={city.notes} onChange={handleChange} rows="4" />
          <button type="submit" className="primary-btn">Update City</button>
        </form>
      </div>
    </div>
  );
}


export default CityDetail;
 