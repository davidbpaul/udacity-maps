import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './components/App';
import serviceWorker from './services/serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker();
