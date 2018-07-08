import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Image, Icon, Segment, Statistic, Modal } from 'semantic-ui-react';
import { getTypeImg } from 'UTILS/Enums';
import { strCapFL } from 'UTILS/ManageStrings';
import Promise from 'bluebird';
import { postCall, getCall, deleteCall, putCall } from 'REDUX/actions/asyncActions';
import { changeFighterSelection, changeOptSelection, updateAnimal, fightUpdate } from 'REDUX/actions/emperorActions';
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
const gifs = [
  'https://giphy.com/embed/a6RnrYe7uvqW4',
  'https://giphy.com/embed/hM6RKCmOIhzRC',
  'https://giphy.com/embed/2usKcJsKck18I',
  'https://giphy.com/embed/V2GExNiJucEqQ',
  'https://giphy.com/embed/AyR83oHrU7NU4',
  'https://giphy.com/embed/UOntuNJv3rYfS',
  'https://giphy.com/embed/Dqzg7VTmUZ2N2'
];

const shake = (tab) => {
  const i = Math.floor(Math.random() * 2) === 1;
  return { winner: tab[ i ? 1 : 0 ], looser: tab[ !i ? 1 : 0 ] };
};

@connect(store => ({
  battles: store.asyn.battles,
  gladiators: store.asyn.gladiators,
  gla: store.emperor.animalToggle,
  fSelectedA: store.emperor.fSelectedA,
  fSelectedB: store.emperor.fSelectedB,
  optSelectedA: store.emperor.optSelectedA,
  optSelectedB: store.emperor.optSelectedB,
  animals: store.asyn.animals,
  fightState: store.emperor.fightState
}))
export default class Eperor extends Component {
  constructor(props) {
    super(props);
    this.doneBattle = this.doneBattle.bind(this);
    this.fight = this.fight.bind(this);
    this.props.dispatch(getCall(
      'http://localhost:3000/battles',
      'INIT_BATTLES'
    ));
    this.props.dispatch(getCall(
      'http://localhost:3000/gladiators',
      'INIT_GLADIATORS'
    ));
  }

  doneBattle() {
    this.props.dispatch(postCall(
      'http://localhost:3000/battles',
      {
      }
    ));
  }

  fight() {
    Promise.delay(50).then(() => this.props.dispatch(fightUpdate({ active: true, state: 'countdown', meta: { anim: 'in', time: 3 } })))
    .delay(500)
    .then(() => this.props.dispatch(fightUpdate({ active: true, state: 'countdown', meta: { anim: 'out', time: 3 } })))
    .delay(500)
    .then(() => this.props.dispatch(fightUpdate({ active: true, state: 'countdown', meta: { anim: 'in', time: 2 } })))
    .delay(500)
    .then(() => this.props.dispatch(fightUpdate({ active: true, state: 'countdown', meta: { anim: 'out', time: 2 } })))
    .delay(500)
    .then(() => this.props.dispatch(fightUpdate({ active: true, state: 'countdown', meta: { anim: 'in', time: 1 } })))
    .delay(500)
    .then(() => this.props.dispatch(fightUpdate({ active: true, state: 'countdown', meta: { anim: 'out', time: 1 } })))
    .delay(500)
    .then(() => this.props.dispatch(fightUpdate({ active: true, state: 'intro', meta: { a: this.props.battles[ 0 ].fighterA, b: this.props.battles[ 0 ].fighterB, animals: this.props.animals, state: 'in' } })))
    .delay(4000)
    .then(() => this.props.dispatch(fightUpdate({ active: true, state: 'intro', meta: { a: this.props.battles[ 0 ].fighterA, b: this.props.battles[ 0 ].fighterB, animals: this.props.animals, state: 'out' } })))
    .delay(500)
    .then(() => this.props.dispatch(fightUpdate({ active: true, state: 'fight', meta: 'out' })))
    .delay(7000)
    .then(() => {
      const { winner, looser } = shake([this.props.gladiators.filter(gladiator => gladiator.type.name === this.props.battles[ 0 ].fighterA.name)[ this.props.fSelectedA ],
        this.props.gladiators.filter(gladiator => gladiator.type.name === this.props.battles[ 0 ].fighterB.name)[ this.props.fSelectedB ]]);
      this.props.dispatch(fightUpdate({
        active: true,
        state: 'winner',
        meta: winner
      }));
      this.props.dispatch(deleteCall(`http://localhost:3000/battles/${this.props.battles[ 0 ]._id}`));
      this.props.dispatch(putCall(`http://localhost:3000/gladiators/${winner._id}`, { stats: { victories: winner.stats.victories + 1, defeats: winner.stats.defeats } }));
      this.props.dispatch(putCall(`http://localhost:3000/gladiators/${looser._id}`, { stats: { victories: looser.stats.victories, defeats: looser.stats.defeats + 1 } }));
    })
    .delay(5000)
    .then(() => {
      this.props.dispatch(fightUpdate({ active: false, state: '', meta: null }));
      this.props.dispatch(getCall(
        'http://localhost:3000/gladiators',
        'INIT_GLADIATORS'
      ));
    });
  }

  render() {
    const gladiatorsA = this.props.gladiators
    .filter(gladiator => this.props.battles.length > 0 && gladiator.type.name === this.props.battles[ 0 ].fighterA.name);
    const gladiatorsB = this.props.gladiators
    .filter(gladiator => this.props.battles.length > 0 && gladiator.type.name === this.props.battles[ 0 ].fighterB.name);
    const animals = this.props.gladiators
    .filter(gladiator => gladiator.type.name === 'animal')
    .map((_animal, i) => (
      <Segment circular key={`animal-${i}`}>
        <Statistic size="mini">
          <Statistic.Value>{this.props.animals[ _animal.name ]}</Statistic.Value>
          <Statistic.Label>{_animal.name}</Statistic.Label>
        </Statistic>
        <div className="overlay">
          <Icon color="teal" name="plus" onClick={() => this.props.dispatch(updateAnimal(_animal.name, 1))} />
          <Icon color="teal" name="minus" onClick={() => this.props.dispatch(updateAnimal(_animal.name, -1))} />
        </div>
      </Segment>
    ));
    let isBattleReady = false;
    if (this.props.gladiators.length > 0 && this.props.battles.length > 0) {
      if ((gladiatorsA[ this.props.fSelectedA ].custom.length > 0 ? this.props.optSelectedA !== '' : true) &&
          (gladiatorsB[ this.props.fSelectedB ].custom.length > 0 ? this.props.optSelectedB !== '' : true)) {
        isBattleReady = true;
      }
    }
    return (
      <div className="emperor">
        <div className="center">
          <div className="headContainer">
            <h1>Emperor</h1>
            <h3>Who will bleed for you?</h3>
          </div>
          <div className="cardsContainer">
            <FighterSelector
              type={this.props.battles.length > 0 ? this.props.battles[ 0 ].fighterA.name : 'Soldier'}
              gladiators={gladiatorsA}
              selected={this.props.fSelectedA}
              changeSelection={i => this.props.dispatch(changeFighterSelection('A', i))}
              changeOpt={opt => this.props.dispatch(changeOptSelection('A', opt))}
              selectedOpt={this.props.optSelectedA}
            />
            <FighterSelector
              type={this.props.battles.length > 0 ? this.props.battles[ 0 ].fighterB.name : 'Soldier'}
              gladiators={gladiatorsB}
              selected={this.props.fSelectedB}
              changeSelection={i => this.props.dispatch(changeFighterSelection('B', i))}
              changeOpt={opt => this.props.dispatch(changeOptSelection('B', opt))}
              selectedOpt={this.props.optSelectedB}
            />
          </div>
          <div className={isBattleReady ? 'engage active' : 'engage inactive'} onClick={isBattleReady ? this.fight : () => {}} >
            <Image size="tiny" src={imgEperor} />
            <div><span>GO</span></div>
          </div>
          <Card raised className={this.props.battles.length > 0 && this.props.battles[ 0 ].animal ? 'animals' : 'animals inactive'}>
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
              <div className={this.props.battles.length > 0 && this.props.battles[ 0 ].animal ? '' : 'blocker'} />
            </Card.Content>
          </Card>
        </div>
        <div className="qContainer">
          <span>Next Fight</span>
          <Card>
            <Card.Content>
              {
                this.props.battles.length > 1 ?
                  <div>
                    <div className="subContainer">
                      <Image size="mini" src={media[ getTypeImg(this.props.battles[ 1 ].fighterA.name) ]} />
                      <Image size="mini" src={media[ getTypeImg(this.props.battles[ 1 ].fighterB.name) ]} />
                    </div>
                    <Image className={this.props.battles[ 0 ].animal ? '' : 'inactive'} size="mini" src={media.animal} />
                  </div>
                :
                  <span>EMPTY</span>
              }
            </Card.Content>
          </Card>
        </div>
        <Modal
          open={this.props.fightState.active}
          basic
        >
          <div className="modalContainer">
            {
              this.props.fightState.state === 'countdown' ?
                <div className="countdown">
                  <h1 className={this.props.fightState.meta.anim}>{this.props.fightState.meta.time}</h1>
                </div>
              : ''
            }
            {
              this.props.fightState.state === 'intro' ?
                <div className="intro">
                  <div className="fighters">
                    <div><h1 className={this.props.fightState.meta.state} >{strCapFL(this.props.fightState.meta.a.name)}</h1></div>
                    <h2 className={this.props.fightState.meta.state} >VS</h2>
                    <div><h3 className={this.props.fightState.meta.state} >{strCapFL(this.props.fightState.meta.b.name)}</h3></div>
                  </div>
                </div>
              : ''
            }
            {
              this.props.fightState.state === 'fight' ?
                <div className={`fight ${this.props.fightState.meta}`}>
                  <iframe title="gif" src={gifs[ Math.floor(Math.random() * gifs.length) ]} width="480" height="204" frameBorder="0" allowFullScreen />
                </div>
              : ''
            }
            {
              this.props.fightState.state === 'winner' ?
                <div className="winner">
                  <h1>WINNER</h1>
                  <Image src={media[ getTypeImg(this.props.fightState.meta.type.name) ]} />
                  <h2>{this.props.fightState.meta.name}</h2>
                </div>
              : ''
            }
          </div>
        </Modal>
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
  fSelectedB: PropTypes.number.isRequired,
  optSelectedA: PropTypes.string.isRequired,
  optSelectedB: PropTypes.string.isRequired,
  animals: PropTypes.object.isRequired,
  fightState: PropTypes.object.isRequired
  // history: PropTypes.object.isRequired
};
