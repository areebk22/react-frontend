import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UploadComponent from './components/UploadComponent';
import Preview from './components/Preview'

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<UploadComponent />} />
          <Route path="/preview" element={<Preview />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
