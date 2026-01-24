
import './App.css';

import NavBar from './Components/Layout/NavBar';

import HomePage from './Pages/Utilities/Home';
import AboutPage from './Pages/Utilities/About';
import CareerPage from './Pages/Utilities/Career';
import ServicesPage from './Pages/Utilities/Services';
import ContactPage from './Pages/Forms/Contact';

import { Routes, Route, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  return (
    <div className="App">
      <NavBar />
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/career" element={<CareerPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </div>
  );
}

export default App;
