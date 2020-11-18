import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import WithErrorApp from './components/app/app';
import 'bootstrap/dist/css/bootstrap.css';
import '/public/index.css';


render(
  <Provider store={store}>
    <WithErrorApp/>
  </Provider>, document.getElementById('root'));
