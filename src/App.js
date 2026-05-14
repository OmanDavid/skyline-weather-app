import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddCity from './pages/AddCity';
import CityDetail from './pages/CityDetail';
import Navbar from './components/Navbar';
import './App.css';


function App() {
  fetch('http://localhost:5000/cities')
    .then(res => res.json())
    .then(data => console.log(data));
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add" element={<AddCity />} />
        <Route path="/city/:id" element={<CityDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;