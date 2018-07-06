import React from 'react';
import PropTypes from 'prop-types';
import { Card, Segment, Dropdown, Statistic, Header } from 'semantic-ui-react';
import { strCapFL } from 'UTILS/ManageStrings';
import { Eye } from 'react-preloading-component';

const FighterSelector = ({ type, gladiators, selected, changeSelection }) => (
  <div className="fighterSelector" >
    <Card raised>
      <Card.Content header={`${strCapFL(type)}s Availables`} />
      <Card.Content>
        {
          gladiators.length > 0 ?
            <div className="subContainer">
              <Segment.Group>
                {
                  gladiators.map((gladiator, i) => (
                    <Segment
                      name={i}
                      className={i === selected ? 'active' : ''}
                      key={`gladiator-${i}`}
                      onClick={() => changeSelection(i)}
                    >
                      {gladiator.name}
                    </Segment>
                  ))
                  }
              </Segment.Group>
              <Segment className="stats">
                <Header as="h3" content={gladiators[ selected ].name} />
                <Statistic.Group size="tiny">
                  <Statistic>
                    <Statistic.Value>{gladiators[ selected ].stats ? gladiators[ selected ].stats.victories : 0}</Statistic.Value>
                    <Statistic.Label>{`Victor${gladiators[ selected ].stats && gladiators[ selected ].stats.victories > 1 ? 'ies' : 'y'}`}</Statistic.Label>
                  </Statistic>
                  <Statistic>
                    <Statistic.Value>{gladiators[ selected ].stats ? gladiators[ selected ].stats.defeats : 0}</Statistic.Value>
                    <Statistic.Label>{`Defeat${gladiators[ selected ].stats && gladiators[ selected ].stats.defeats > 1 ? 's' : ''}`}</Statistic.Label>
                  </Statistic>
                </Statistic.Group>
                {
                  gladiators[ selected ].custom.length > 0 ?
                    <Dropdown placeholder="Mandatory Option" fluid selection options={gladiators[ selected ].custom.map(g => ({ text: g, value: g }))} />
                  : ''
                }
              </Segment>
            </div>
          :
            <div className="wait"><Eye size={60} color="#00b5ad" /></div>
        }
      </Card.Content>
    </Card>
  </div>
);

FighterSelector.propTypes = {
  type: PropTypes.string.isRequired,
  gladiators: PropTypes.array.isRequired,
  selected: PropTypes.number.isRequired,
  changeSelection: PropTypes.func.isRequired
};

export default FighterSelector;
