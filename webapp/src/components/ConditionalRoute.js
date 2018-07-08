import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { Triple } from 'react-preloading-component';
import { socketInit } from 'REDUX/actions/asyncActions';

@connect(store => ({
  connected: store.asyn.connected
}))
export default class ConditionalRoute extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(socketInit());
  }

  render() {
    const { component, ...rest } = this.props;
    if (this.props.connected) {
      return (
        <Route
          {...rest}
          render={props => React.createElement(component, props)}
        />
      );
    }
    return (
      <div className="waitAPI">
        <h1>You are not connected to the internet : please check your connection</h1>
        <span>No need to reload, we are waiting for you</span>
        <div className="container"><Triple size={100} color="#1CB5AC" /></div>
      </div>
    );
  }
}
ConditionalRoute.WrappedComponent.displayName = 'ConditionalRoute';
ConditionalRoute.WrappedComponent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  component: PropTypes.func.isRequired,
  connected: PropTypes.bool.isRequired
};
