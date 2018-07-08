const defaults = {
  fSelectedA: 0,
  fSelectedB: 0,
  isBattleReady: false,
  optSelectedA: '',
  optSelectedB: '',
  fightState: {
    active: false,
    state: 'close'
  },
  error: null
};

export default function reducer(state = defaults, action) {
  switch (action.type) {
  case 'CHANGE_FIGHTER_SELECTION': {
    const nw = { ...state };
    nw[ `fSelected${action.payload.fighter}` ] = action.payload.i;
    nw[ `optSelected${action.payload.fighter}` ] = '';
    return nw;
  }
  case 'CHANGE_OPT_SELECTION': {
    const nw = { ...state };
    nw[ `optSelected${action.payload.fighter}` ] = action.payload.opt;
    return nw;
  }
  case 'FIGHT_UPDATE': {
    return {
      ...state,
      fightState: action.payload
    };
  }
  default: {
    return state;
  }
  }
}
