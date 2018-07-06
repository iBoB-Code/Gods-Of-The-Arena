import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Image, Segment, Button, Checkbox, Icon } from 'semantic-ui-react';
import { getTypeImg } from 'UTILS/Enums';
import { toggleAnimal, changeType } from 'REDUX/actions/ludusActions';
import { postCall, getCall, deleteCall } from 'REDUX/actions/asyncActions';
import imgLudus from 'ASSETS/images/ludus.png';
import sword from 'ASSETS/images/sword.png';
import horse from 'ASSETS/images/horse.png';
import animal from 'ASSETS/images/animal.png';
import spear from 'ASSETS/images/spear.png';
import archer from 'ASSETS/images/archer.png';
import def from 'ASSETS/images/def.png';
import CarouselSelector from './components/CarouselSelector';

const media = { sword, horse, animal, spear, archer, def };

@connect(store => ({
  battles: store.asyn.battles,
  types: store.asyn.types,
  selectedTypeA: store.ludus.selectedTypeA,
  selectedTypeB: store.ludus.selectedTypeB,
  animalToggle: store.ludus.animalToggle
}))
export default class Ludus extends Component {
  constructor(props) {
    super(props);
    this.changeFighterType = this.changeFighterType.bind(this);
    this.programBattle = this.programBattle.bind(this);
    this.deleteBattle = this.deleteBattle.bind(this);
    this.props.dispatch(getCall(
      'http://localhost:3000/battles',
      'INIT_BATTLES'
    ));
    this.props.dispatch(getCall(
      'http://localhost:3000/types',
      'INIT_TYPES'
    ));
  }

  changeFighterType(fighter, direction) {
    document.getElementById(`fighter${fighter}`).classList.add(`move${direction}`);
    setTimeout(() => {
      document.getElementById(`fighter${fighter}`).classList.remove(`move${direction}`);
    }, 500);
    setTimeout(() => {
      this.props.dispatch(changeType(fighter, direction));
    }, 250);
  }

  programBattle() {
    this.props.dispatch(postCall(
      'http://localhost:3000/battles',
      {
        fighterA: this.props.types[ Math.abs(this.props.selectedTypeA) % this.props.types.length ],
        fighterB: this.props.types[ Math.abs(this.props.selectedTypeB) % this.props.types.length ],
        animal: this.props.animalToggle
      }
    ));
  }

  deleteBattle(e, data) {
    this.props.dispatch(deleteCall(`http://localhost:3000/battles/${data.name}`));
  }

  render() {
    const battles = this.props.battles.map((battle, i) => (
      <Card key={`battle-${i}`} name={battle._id} onClick={this.deleteBattle}>
        <Card.Content>
          <div className="subContainer">
            <Image size="mini" src={media[ getTypeImg(battle.fighterA.name) ]} />
            <Image size="mini" src={media[ getTypeImg(battle.fighterB.name) ]} />
          </div>
          <Image className={battle.animal ? '' : 'inactive'} size="mini" src={media.animal} />
          <div className="overlay">
            <span>X</span>
          </div>
        </Card.Content>
      </Card>
    ));
    return (
      <div className="ludus">
        <div className="center">
          <h1>Ludus</h1>
          <div className="cardsContainer">
            <Card raised >
              <Card.Content header="Built a battle" />
              <Card.Content>
                {
                  this.props.types.length > 0 ?
                    <div className="subContainer">
                      <CarouselSelector
                        types={this.props.types}
                        active={this.props.selectedTypeA}
                        change={this.changeFighterType}
                        fighter="A"
                      />
                      <h1>VS</h1>
                      <CarouselSelector
                        types={this.props.types}
                        active={this.props.selectedTypeB}
                        change={this.changeFighterType}
                        fighter="B"
                      />
                    </div>
                    : ''
                }
                <div className="animalsContainer">
                  <span>Spice it up with animals?</span>
                  <Checkbox slider color="teal" checked={this.props.animalToggle} onChange={() => this.props.dispatch(toggleAnimal())} />
                </div>
                <Button
                  content="Program this battle"
                  color="teal"
                  onClick={this.programBattle}
                  disabled={this.props.types[ Math.abs(this.props.selectedTypeA) % this.props.types.length ] ===
                            this.props.types[ Math.abs(this.props.selectedTypeB) % this.props.types.length ]}
                />
              </Card.Content>
            </Card>
          </div>
        </div>
        <div className="qContainer">
          <Image size="small" src={imgLudus} />
          <Segment raised>
            <Icon size="big" name="arrow circle left" color="teal" />
            {battles}
          </Segment>
        </div>
      </div>
    );
  }
}
Ludus.WrappedComponent.displayName = 'Ludus';
Ludus.WrappedComponent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  battles: PropTypes.array.isRequired,
  types: PropTypes.array.isRequired,
  selectedTypeA: PropTypes.number.isRequired,
  selectedTypeB: PropTypes.number.isRequired,
  animalToggle: PropTypes.bool.isRequired
  // history: PropTypes.object.isRequired
};
