import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import 'semantic-ui-css/semantic.min.css';
import BrowserRouter from 'react-router-dom/BrowserRouter';

import Home from './Home';
import Ludus from './Ludus';
import Emperor from './Emperor';
import NotFound from './NotFound';

if (process.env.NODE_ENV === 'development') {
  require('./Home'); // eslint-disable-line global-require
  require('./Ludus'); // eslint-disable-line global-require
  require('./Emperor'); // eslint-disable-line global-require
  require('./NotFound'); // eslint-disable-line global-require
}

const supportsHistory = 'pushState' in window.history;

const App = props => (
  <Provider store={props.store}>
    <BrowserRouter forceRefresh={!supportsHistory} keyLength={12}>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/Ludus" component={Ludus} />
          <Route exact path="/Emperor" component={Emperor} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
);

App.propTypes = {
  store: PropTypes.object.isRequired
};

export default App;
