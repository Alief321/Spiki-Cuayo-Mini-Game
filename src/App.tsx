import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './layouts/Main';
import SpikiChibi from './layouts/Spiki';
import Cek from './layouts/Cek';

const AppContent: React.FC = () => {
  return (
    <Main>
      <Routes>
        <Route path="/" element={<SpikiChibi />} />
        <Route path="/cek" element={<Cek />} />
      </Routes>
    </Main>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
