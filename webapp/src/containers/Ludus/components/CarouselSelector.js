import React from 'react';
import PropTypes from 'prop-types';
import { Image, Icon, Header } from 'semantic-ui-react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { strCapFL } from 'UTILS/ManageStrings';
import { getTypeImg } from 'UTILS/Enums';
import sword from 'ASSETS/images/sword.png';
import horse from 'ASSETS/images/horse.png';
import animal from 'ASSETS/images/animal.png';
import spear from 'ASSETS/images/spear.png';
import archer from 'ASSETS/images/archer.png';
import def from 'ASSETS/images/def.png';

const media = { sword, horse, animal, spear, archer, def };

const CarouselSelector = ({ types, active, change, fighter }) => (
  <div className="carouselSelector" id={`fighter${fighter}`}>
    <Header as="h2" content={strCapFL(types[ Math.abs(active) % types.length ])} />
    <Icon size="huge" color="teal" name="angle up" onClick={() => change(fighter, 'up')} />
    <ReactCSSTransitionGroup
      transitionName="fade"
      transitionEnterTimeout={500}
      transitionLeaveTimeout={300}
    >
      <Image size="small" src={media[ getTypeImg(types[ Math.abs(active) % types.length ]) ]} />
    </ReactCSSTransitionGroup>
    <Icon size="huge" color="teal" name="angle down" onClick={() => change(fighter, 'down')} />
  </div>
);

CarouselSelector.propTypes = {
  types: PropTypes.array.isRequired,
  active: PropTypes.number.isRequired,
  change: PropTypes.func.isRequired,
  fighter: PropTypes.string.isRequired
};

export default CarouselSelector;
