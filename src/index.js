// Import
import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';

// local Import
import './index.css';
import App from './components/App.js';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
