import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Dash from './components/Dash';

ReactDOM.render(
  <React.StrictMode>
  <Dash style={{backgroundColor:"#58687E"}} level = {0}/>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
