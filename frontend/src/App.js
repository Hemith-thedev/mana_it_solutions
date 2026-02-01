
import './App.css';

import NavBar from './Components/Layout/NavBar';

import HomePage from './Pages/Utilities/Home';
import AboutPage from './Pages/Utilities/About';
import CareerPage from './Pages/Utilities/Career';
import ServicesPage from './Pages/Utilities/Services';
import ContactPage from './Pages/Forms/Contact';

import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
// import Lenis from 'lenis';

function App() {
  const location = useLocation();
  const [isNavOpen, setIsNavOpen] = useState(false);
  useEffect(() => {
    const header = document.querySelector("header");
    if (header) {
      if (header?.classList.contains("opened")) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    }
  });
  // useEffect(() => {
  //   const lenis = new Lenis();
  //   function raf(time) {
  //     lenis.raf(time);
  //     requestAnimationFrame(raf);
  //   }
  //   requestAnimationFrame(raf);
  // })
  return (
    <div className={`App flex flex-col justify-start items-center min-h-screen w-screen`}>
      <NavBar isOpen={isNavOpen} onClick={() => setIsNavOpen(prev => !prev)} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/career" element={<CareerPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
