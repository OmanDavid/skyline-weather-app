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

  useEffect(() => {
    fetch(`http://localhost:5000/cities/${id}`)
      .then((res) => res.json())
      .then((data) => setCity(data));
  }, [id]);

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
        <h1>Edit City</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={city.name}
            onChange={handleChange}
          />

          <input
            type="text"
            name="country"
            value={city.country}
            onChange={handleChange}
          />

          <input
            type="number"
            name="temperature"
            value={city.temperature}
            onChange={handleChange}
          />

          <input
            type="text"
            name="label"
            value={city.label}
            onChange={handleChange}
          />

          <textarea
            name="notes"
            value={city.notes}
            onChange={handleChange}
            rows="4"
          />

          <button type="submit" className="primary-btn">
            Update City
          </button>
        </form>
      </div>
    </div>
  );
}

export default CityDetail;
 