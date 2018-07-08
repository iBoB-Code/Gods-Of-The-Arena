export function changeFighterSelection(fighter, i) {
  return {
    type: 'CHANGE_FIGHTER_SELECTION',
    payload: { fighter, i }
  };
}

export function changeOptSelection(fighter, opt) {
  return {
    type: 'CHANGE_OPT_SELECTION',
    payload: { fighter, opt }
  };
}

export function updateAnimal(animal, i) {
  return {
    type: 'UPDATE_ANIMAL_COUNT',
    payload: { animal, i }
  };
}

export function fightUpdate(state) {
  return dispatch => new Promise((resolve) => {
    dispatch({ type: 'FIGHT_UPDATE', payload: state });
    return resolve();
  });
}
