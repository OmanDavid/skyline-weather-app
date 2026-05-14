import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddCity from './pages/AddCity';
import CityDetail from './pages/CityDetail';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddCity />} />
          <Route path="/city/:name" element={<CityDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
