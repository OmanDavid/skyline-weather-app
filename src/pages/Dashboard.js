import { useState, useEffect } from 'react';
import CityList from '../components/CityList';

// Dashboard page - the home page, shows all saved cities
function Dashboard() {
  // useState stores our cities array, starts as empty array
  const [cities, setCities] = useState([]);

  // useEffect runs once when the component loads
  // it fetches all saved cities from json-server
  useEffect(() => {
    fetch('http://localhost:5000/cities')
      .then(res => res.json())
      .then(data => setCities(data)); // saves the cities into state
  }, []); // empty array means run once on load

  return (
    <div>
      <h1>My Cities</h1>
      {/* pass cities array and setCities to CityList */}
      <CityList cities={cities} setCities={setCities} />
    </div>
  );
}

export default Dashboard;