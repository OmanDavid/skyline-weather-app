import { useState, useEffect } from 'react';
import CityList from '../components/CityList';

function Dashboard() {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/cities')
      .then(res => res.json())
      .then(data => setCities(data));
  }, []);

  return (
    <div className="page-container">
      <div className="dashboard-header">
        <h1>My Cities</h1>
      </div>

      <CityList cities={cities} setCities={setCities} />
    </div>
  );
}

export default Dashboard;
