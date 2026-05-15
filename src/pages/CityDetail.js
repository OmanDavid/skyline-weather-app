import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function CityDetail() {
  const { id } = useParams();

  const [city, setCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [notes, setNotes] = useState('');

  // tracks if weather fetch failed
  const [error, setError] = useState(false);

  // fetch city from json-server
  useEffect(() => {
    fetch(`http://localhost:5000/cities/${id}`)
      .then(res => res.json())
      .then(data => {
        setCity(data);
        setNotes(data.notes || '');
      });
  }, [id]);

  // fetch live weather once city name is available
  useEffect(() => {
    if (city?.name) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
      )
        .then(res => res.json())
        .then(data => {
          // only set weather if response is successful
          if (data.cod === 200) {
            setWeather({
              temp: Math.round(data.main.temp),
              condition: data.weather[0].description,
              humidity: data.main.humidity,
              wind: data.wind.speed,
              feelsLike: Math.round(data.main.feels_like)
            });
          } else {
            // API returned an error
            setError(true);
          }
        })
        // network or connection error
        .catch(() => setError(true));
    }
  }, [city]);

  // save notes via PATCH to json-server
  function handleSaveNotes() {
    fetch(`http://localhost:5000/cities/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notes })
    }).then(() => alert('Notes saved!'));
  }

  // show loading while city is being fetched
  if (!city) return <p>Loading...</p>;

  return (
    <div className="city-detail">
      <h1>{city.name}</h1>

      {/* show weather, error or loading */}
      {error ? (
        <p>Weather unavailable</p>
      ) : weather ? (
        <>
          <h2 className="temperature">{Math.round(weather.temp)}°C</h2>
          <p className="condition">{weather.condition}</p>

          <div className="detail-cards">
            <div className="detail-card">
              <p>Humidity</p>
              <h3>{weather.humidity}%</h3>
            </div>
            <div className="detail-card">
              <p>Wind</p>
              <h3>{weather.wind} km/h</h3>
            </div>
            <div className="detail-card">
              <p>Feels Like</p>
              <h3>{weather.feelsLike}°C</h3>
            </div>
          </div>
        </>
      ) : (
        <p>Loading weather...</p>
      )}

      {/* personal notes section */}
      <div className="notes-section">
        <h3>Personal Notes</h3>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="Add your notes here..."
          rows="6"
        />
        <button onClick={handleSaveNotes}>Save Notes</button>
      </div>
    </div>
  );
}

export default CityDetail;