import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './components/Layout';
import Table from './pages/Table';
import Chart from './pages/Chart';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/table" element={<Table />} />
          <Route path="/chart" element={<Chart />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
