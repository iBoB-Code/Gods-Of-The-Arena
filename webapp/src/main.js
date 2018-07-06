import React from 'react';
import { render } from 'react-dom';
import configureStore from 'REDUX/configureStore';
import Root from './containers/App';

// Inject global styles
import('src/styles/app.scss');

// Configure Redux store
const store = configureStore();

// Render React
const rootEl = document.getElementById('root');

if (process.env.NODE_ENV === 'production') {
  // console.log = () => {};
  render(<Root store={store} />, rootEl);
} else {
  const AppContainer = require('react-hot-loader').AppContainer; // eslint-disable-line global-require
  // Trick babel to avoid hoisting <AppContainer />
  // transform-react-constant-elements
  const noHoist = {};

  render((
    <AppContainer {...noHoist}>
      <Root store={store} />
    </AppContainer>
  ), rootEl);

  // Hot Reloading
  if (module.hot) {
    module.hot.accept('./containers/App', () => {
      render(
        <AppContainer {...noHoist}>
          <Root store={store} />
        </AppContainer>,
        rootEl
      );
    });
  }
}
