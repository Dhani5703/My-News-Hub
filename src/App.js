import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';

import Login from './pages/Login';
import Layout from './components/Layout';
import News from './pages/News';

const App = () => {
  return (
    <Provider store={store}>   
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<Layout />}>
            <Route path="/news" element={<News />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
