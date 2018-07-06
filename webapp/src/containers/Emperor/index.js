import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Image, Icon, Segment, Statistic } from 'semantic-ui-react';
import { getTypeImg } from 'UTILS/Enums';
// import { toggleAnimal } from 'REDUX/actions/emperorActions';
import { postCall, getCall } from 'REDUX/actions/asyncActions';
import { changeFighterSelection } from 'REDUX/actions/emperorActions';
import { Eye } from 'react-preloading-component';
import imgEperor from 'ASSETS/images/emperor.png';
import sword from 'ASSETS/images/sword.png';
import horse from 'ASSETS/images/horse.png';
import animal from 'ASSETS/images/animal.png';
import spear from 'ASSETS/images/spear.png';
import archer from 'ASSETS/images/archer.png';
import def from 'ASSETS/images/def.png';
import FighterSelector from './components/FighterSelector';

const media = { sword, horse, animal, spear, archer, def };

@connect(store => ({
  battles: store.asyn.battles,
  gladiators: store.asyn.gladiators,
  gla: store.emperor.animalToggle,
  fSelectedA: store.emperor.fSelectedA,
  fSelectedB: store.emperor.fSelectedB
}))
export default class Eperor extends Component {
  constructor(props) {
    super(props);
    this.handleFighterSelectionChange = this.handleFighterSelectionChange.bind(this);
    this.doneBattle = this.doneBattle.bind(this);
    this.props.dispatch(getCall(
      'http://localhost:3000/battles',
      'INIT_BATTLES'
    ));
    this.props.dispatch(getCall(
      'http://localhost:3000/gladiators',
      'INIT_GLADIATORS'
    ));
  }

  handleFighterSelectionChange(fighter, i) {
    this.props.dispatch(changeFighterSelection(fighter, i));
  }

  doneBattle() {
    this.props.dispatch(postCall(
      'http://localhost:3000/battles',
      {
      }
    ));
  }

  render() {
    const gladiatorsA = this.props.gladiators
    .filter(gladiator => gladiator.type.name === this.props.battles[ 0 ].fighterA.name);
    const gladiatorsB = this.props.gladiators
    .filter(gladiator => gladiator.type.name === this.props.battles[ 0 ].fighterB.name);
    const animals = this.props.gladiators
    .filter(gladiator => gladiator.type.name === 'animal')
    .map((_animal, i) => (
      <Segment circular key={`animal-${i}`}>
        <Statistic size="mini">
          <Statistic.Value>0</Statistic.Value>
          <Statistic.Label>{_animal.name}</Statistic.Label>
        </Statistic>
        <div className="overlay">
          <Icon color="teal" name="plus" />
          <Icon color="teal" name="minus" />
        </div>
      </Segment>
    ));
    return (
      <div className="emperor">
        <div className="center">
          <h1>Emperor</h1>
          <h3>Who will bleed for you?</h3>
          <div className="cardsContainer">
            <FighterSelector
              type={this.props.battles.length > 0 ? this.props.battles[ 0 ].fighterA.name : 'Soldier'}
              gladiators={gladiatorsA}
              selected={this.props.fSelectedA}
              changeSelection={i => this.handleFighterSelectionChange('A', i)}
            />
            <FighterSelector
              type={this.props.battles.length > 0 ? this.props.battles[ 0 ].fighterB.name : 'Soldier'}
              gladiators={gladiatorsB}
              selected={this.props.fSelectedB}
              changeSelection={i => this.handleFighterSelectionChange('B', i)}
            />
          </div>
          <div className="engage">
            <Image size="tiny" src={imgEperor} />
          </div>
          <Card raised className="animals">
            <Card.Content header="Animals to throw in the fight" />
            <Card.Content>
              {
                this.props.gladiators.length > 0 ?
                  <div className="subContainer">
                    {animals}
                  </div>
                :
                  <div className="wait"><Eye size={60} color="#00b5ad" /></div>
              }
            </Card.Content>
          </Card>
        </div>
        <div className="qContainer">
          <span>Next Fight</span>
          <Card>
            <Card.Content>
              {
                this.props.battles.length > 0 ?
                  <div>
                    <div className="subContainer">
                      <Image size="mini" src={media[ getTypeImg(this.props.battles[ 0 ].fighterA.name) ]} />
                      <Image size="mini" src={media[ getTypeImg(this.props.battles[ 0 ].fighterB.name) ]} />
                    </div>
                    <Image className={this.props.battles[ 0 ].animal ? '' : 'inactive'} size="mini" src={media.animal} />
                  </div>
                :
                  <div className="wait"><Eye size={60} color="#00b5ad" /></div>
              }
            </Card.Content>
          </Card>
        </div>
      </div>
    );
  }
}
Eperor.WrappedComponent.displayName = 'Eperor';
Eperor.WrappedComponent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  battles: PropTypes.array.isRequired,
  gladiators: PropTypes.array.isRequired,
  fSelectedA: PropTypes.number.isRequired,
  fSelectedB: PropTypes.number.isRequired
  // history: PropTypes.object.isRequired
};
