import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './index.css';
import { store, history } from './_helpers';
import { Header } from './Layout';
import { Cars, Car } from './Car';
import { Login, Register } from './User';

ReactDOM.render(
  <React.StrictMode>
    <Router history={ history }>
      <Provider store={ store }>
        <Header />
        <div className='Main'>
          <Switch>
            <Route exact path='/' component={ Cars } />
            <Route exact path='/cars' component={ Cars } />
            <Route exact path='/cars/:_id' component={ Car } />
            <Route exact path='/login' component={ Login } />
            <Route exact path='/register' component={ Register } />
          </Switch>
        </div>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
