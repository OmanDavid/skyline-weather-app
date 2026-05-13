import { useState, useEffect } from 'react';
import CityList from '../components/CityList';
import SearchBar from '../components/SearchBar';

function Dashboard() {
  const [cities, setCities] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/cities')
      .then(res => res.json())
      .then(data => setCities(data));
  }, []);

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="dashboard-header">
        <h1>Skyline Weather Dashboard</h1>
        <p>Track cities and weather conditions in one place.</p>
      </div>

      <SearchBar search={search} setSearch={setSearch} />

      <CityList cities={filteredCities} setCities={setCities} />
    </div>
  );
}

export default Dashboard;
