import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StudioPage from './pages/StudioPage';
import Navbar from './components/Navbar';
import BuyPage from './pages/BuyPage';
import SellPage from './pages/SellPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/studio" element={<StudioPage />} />
        <Route path="/buy" element={<BuyPage />} />
        <Route path="/sell" element={<SellPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </div>
  );
}

export default App;
