import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Layout from './pages/Layout';
import Table from './components/Table';
import Chart from './components/Chart';

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
