import React from 'react';
import ReactDOM from 'react-dom';
import WClient from './WClient';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <WClient />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
