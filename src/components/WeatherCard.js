import { useNavigate } from 'react-router-dom';

// WeatherCard component - displays weather info for one city
// also handles the delete functionality
function WeatherCard({ city, cities, setCities }) {
  // useNavigate lets us redirect to another page programmatically
  const navigate = useNavigate();

  // Delete function - removes city from json-server and updates state
  function handleDelete() {
    fetch(`http://localhost:5000/cities/${city.id}`, {
      method: 'DELETE'
    })
      .then(() => {
        // filter out the deleted city from the cities array
        const updated = cities.filter(c => c.id !== city.id);
        setCities(updated);
      });
  }

  return (
    <div>
      {/* city name */}
      <h2>{city.name}</h2>

      {/* temperature and condition will come from the weather API later */}
      <p>Label: {city.label}</p>
      <p>Notes: {city.notes}</p>

      {/* clicking Edit navigates to the city detail page */}
      <button onClick={() => navigate(`/city/${city.id}`)}>Edit</button>

      {/* clicking Delete removes the city */}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default WeatherCard;