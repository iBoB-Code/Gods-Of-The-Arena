import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import promise from 'redux-promise-middleware';
import reducer from 'REDUX/reducers/index';
// import { routerMiddleware } from 'react-router-redux';

export const configure = (history, initialState = {}) => {
  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(promise(), thunk, createLogger()),
      window.devToolsExtension && process.env.NODE_ENV !== 'production' ? window.devToolsExtension() : f => f
    )
  );

  if (module.hot) {
    module.hot.accept('REDUX/reducers/index', () => {
      store.replaceReducer(reducer);
    });
  }

  return store;
};

export default configure;
