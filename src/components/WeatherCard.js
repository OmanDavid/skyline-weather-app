import { useNavigate } from 'react-router-dom';

function WeatherCard({ city, cities, setCities }) {
  const navigate = useNavigate();

  function handleDelete() {
    fetch(`http://localhost:5000/cities/${city.id}`, {
      method: 'DELETE'
    }).then(() => {
      const updated = cities.filter((c) => c.id !== city.id);
      setCities(updated);
    });
  }

  return (
    <div className="weather-card">
      <div>
        <h2>{city.name}</h2>
        <p>{city.country}</p>
      </div>

      <div className="weather-details">
        <span>{city.temperature}°C</span>
        <p>{city.label}</p>
      </div>

      <p className="notes">{city.notes}</p>

      <div className="button-group">
        <button onClick={() => navigate(`/city/${city.id}`)}>
          Edit
        </button>
        <button className="delete-btn" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default WeatherCard;
