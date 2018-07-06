import React from 'react';
import PropTypes from 'prop-types';
import { Header, Icon, Button } from 'semantic-ui-react';

const NotFound = props => (
  <main className="notFound">
    <Header as="h1" icon textAlign="center" color="grey">
      <Icon name="minus circle" color="red" circular />
      <Header.Content>
        404 NOT FOUND
      </Header.Content>
    </Header>
    <Button content="Back on tracks" icon="left arrow" labelPosition="left" onClick={() => props.history.push('/')} />
  </main>
);

NotFound.propTypes = {
  history: PropTypes.func.isRequired
};

export default NotFound;
