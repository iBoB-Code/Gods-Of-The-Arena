export function toggleAnimal() {
  return {
    type: 'TOGGLE_ANIMAL',
    payload: null
  };
}

export function changeType(fighter, direction) {
  return {
    type: 'CHANGE_TYPE',
    payload: { fighter, direction }
  };
}
