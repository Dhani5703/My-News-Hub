import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './components/Layout';
import News from './pages/News';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/news" element={<News />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
