import React from 'react';
import {render} from 'react-dom';
import App from './components/app/app';
import 'bootstrap/dist/css/bootstrap.css';
import '/public/index.css';
import ErrorBoundary from './components/errorBoundary/errorBoundary';


render(
  <ErrorBoundary>
    <App/>
  </ErrorBoundary>, document.getElementById('root'));
