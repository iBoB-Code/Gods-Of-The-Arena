const defaults = {
  selectedTypeA: 0,
  selectedTypeB: 0,
  animalToggle: false,
  error: null
};

export default function reducer(state = defaults, action) {
  switch (action.type) {
  case 'CHANGE_TYPE': {
    const nw = { ...state };
    nw[ `selectedType${action.payload.fighter}` ] = action.payload.direction === 'up' ? nw[ `selectedType${action.payload.fighter}` ] + 1 : nw[ `selectedType${action.payload.fighter}` ] - 1;
    return nw;
  }
  case 'TOGGLE_ANIMAL': {
    return {
      ...state,
      animalToggle: !state.animalToggle
    };
  }
  default: {
    return state;
  }
  }
}
