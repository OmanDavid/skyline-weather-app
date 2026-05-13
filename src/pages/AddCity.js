import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NoteForm from '../components/NoteForm';

const weatherOptions = [
  'Sunny',
  'Cloudy',
  'Rainy',
  'Stormy',
  'Windy'
];

function AddCity() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    temperature: '',
    label: 'Sunny'
  });
  const [notes, setNotes] = useState('');

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newCity = {
      ...formData,
      notes
    };

    fetch('http://localhost:5000/cities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCity)
    })
      .then((res) => res.json())
      .then(() => navigate('/'));
  }

  return (
    <div className="page-container">
      <div className="form-card">
        <h1>Add New City</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="City Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="temperature"
            placeholder="Temperature °C"
            value={formData.temperature}
            onChange={handleChange}
            required
          />

          <select
            name="label"
            value={formData.label}
            onChange={handleChange}
          >
            {weatherOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <NoteForm notes={notes} setNotes={setNotes} />

          <button type="submit" className="primary-btn">
            Save City
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCity;
