import WeatherCard from './WeatherCard';

// CityList component - receives cities from Dashboard and renders a card for each
function CityList({ cities, setCities }) {
  // if no cities saved yet, show a message
  if (cities.length === 0) {
    return <p>No cities saved yet. Add one!</p>;
  }

  return (
    <div className="weather-grid">
      {/* loop through each city and render a WeatherCard */}
      {cities.map(city => (
        <WeatherCard
          key={city.id}
          city={city}
          setCities={setCities}
          cities={cities}
        />
      ))}
    </div>
  );
}

export default CityList;