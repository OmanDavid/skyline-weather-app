import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddCity from './pages/AddCity';
import CityDetail from './pages/CityDetail';
import Navbar from './components/Navbar';
import NoteForm from './components/NoteForm';
import './App.css';
import SearchBar from './components/SearchBar';

function App() {
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