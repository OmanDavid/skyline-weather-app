import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddCity() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [result, setResult] = useState(null);

  // fetch weather from OpenWeatherMap when Search is clicked
  function handleSearch() {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
    )
      .then(res => res.json())
      .then(data => {
        if (data.cod === 200) {
          setResult({
            name: data.name,
            country: data.sys.country,
            temp: data.main.temp,
            condition: data.weather[0].description
          });
        } else {
          alert('City not found. Try again.');
        }
      });
  }

  // POST the city to json-server when Save City is clicked
  function handleSave() {
    fetch('http://localhost:5000/cities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: result.name,
        country: result.country,
        label: '',
        notes: ''
      })
    })
      .then(res => res.json())
      .then(() => navigate('/'));
  }

  return (
    <div className="page-container">
      <h1>Add To My Cities</h1>

      {/* search bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a city..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* result card - only shows after a successful search */}
      {result && (
        <div className="result-card">
          <div>
            <h2>{result.name}</h2>
            <p className="temp">{result.temp}°C</p>
            <p>{result.condition}</p>
          </div>
          <button onClick={handleSave}>Save City</button>
        </div>
      )}
    </div>
  );
}

export default AddCity;