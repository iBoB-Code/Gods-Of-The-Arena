import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Image, Segment, Header } from 'semantic-ui-react';
import imgLudus from 'ASSETS/images/ludus.png';
import imgEmperor from 'ASSETS/images/emperor.png';
// import socketio from 'socket.io';

// const io = socketio();

@connect(() => ({
}))
export default class Home extends Component {
  // constructor(props) {
  //   super(props);
  //   io.on('join', (data) => {
  //     console.log(data);
  //     io.emit('messages', 'Hello from server');
  //   });
  // }

  render() {
    return (
      <div className="home">
        <h1>Welcome To Gods Of The Arena</h1>
        <h3>Who Are You?</h3>
        <div className="cardsContainer">
          <div className="cardSubContainer">
            <Card color="teal" className="left">
              <Card.Content className="head" header="The Ludus" />
              <Card.Content className="bod">
                <Image src={imgLudus} onClick={() => this.props.history.push('/Ludus')} />
              </Card.Content>
            </Card>
          </div>
          <Segment circular>
            <Header as="h2" content="OR" />
          </Segment>
          <div className="cardSubContainer">
            <Card color="teal" className="right">
              <Card.Content className="head" header="The Emperor" />
              <Card.Content className="bod">
                <Image src={imgEmperor} onClick={() => this.props.history.push('/Emperor')} />
              </Card.Content>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}
Home.displayName = 'Home';
Home.propTypes = {
  history: PropTypes.object.isRequired
};
