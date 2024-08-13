import React from 'react';
// import ReactDOM from 'react-dom/client'; // React 18에서 createRoot를 사용합니다.
import { Provider } from 'react-redux';
import  store  from './store/store'; // store를 import합니다.
import { createRoot } from 'react-dom/client'
import './index.css';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

