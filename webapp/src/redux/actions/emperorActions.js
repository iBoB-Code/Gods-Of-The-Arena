export function changeFighterSelection(fighter, i) {
  return {
    type: 'CHANGE_FIGHTER_SELECTION',
    payload: { fighter, i }
  };
}


export function anotherDummyAction(someValue) {
  return {
    type: 'TRIGGER_SOMETHING',
    payload: someValue
  };
}
