import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Team from './components/Team';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Treatment from './components/Treatment';
import { motion } from 'framer-motion';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className={`min-h-screen ${darkMode ? 'dark bg-gray-950 text-white' : 'bg-white text-gray-950'}`}>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Routes>
          <Route path="/" element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }} >
              <Home darkMode={darkMode} />
            </motion.div>
          } />
          <Route path="/team" element={<Team darkmode={darkMode} />} />
          <Route path="/treatment" element={<Treatment darkMode={darkMode} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
