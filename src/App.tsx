import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './layouts/Main';
import SpikiChibi from './layouts/Spiki';

const AppContent: React.FC = () => {
  return (
    <Main>
      <Routes>
        <Route path="/" element={<SpikiChibi />} />
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
