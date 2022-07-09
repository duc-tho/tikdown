import React from 'react';
import ReactDOM from 'react-dom/client';
import Master from './pages/master';
import './assets/styles/global.scss';
import * as serviceWorkerRegistration from './services/worker/serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const initComponent = <React.StrictMode children={<Master/>}/>;

root.render(initComponent);
serviceWorkerRegistration.unregister();
