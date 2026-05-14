import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddCity() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSearch() {
    if (!search.trim()) {
      setError('Please enter a city name.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

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
          setError('City not found. Please try again.');
        }
      })
      .catch(() => setError('Something went wrong. Check your connection.'))
      .finally(() => setLoading(false));
  }

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

      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a city..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') handleSearch();
          }}
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {/* error message */}
      {error && <p className="error-message">{error}</p>}

      {/* result card */}
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