const defaults = {
  fSelectedA: 0,
  fSelectedB: 0,
  error: null
};

export default function reducer(state = defaults, action) {
  switch (action.type) {
  case 'CHANGE_FIGHTER_SELECTION': {
    const nw = { ...state };
    nw[ `fSelected${action.payload.fighter}` ] = action.payload.i;
    return nw;
  }
  default: {
    return state;
  }
  }
}
