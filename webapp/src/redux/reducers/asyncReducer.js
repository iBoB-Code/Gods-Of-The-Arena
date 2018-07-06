const defaults = {
  battles: [],
  types: [],
  gladiators: [],
  fetching: false,
  token: ''
};

export default function reducer(state = defaults, action) {
  switch (action.type) {
  case 'FETCH_UPDATE': {
    return {
      ...state,
      fetching: action.payload
    };
  }
  case 'INIT_BATTLES': {
    return {
      ...state,
      battles: action.payload
    };
  }
  case 'INIT_TYPES': {
    const types = action.payload.map(type => type.name).filter(type => type !== 'animal');
    return {
      ...state,
      types
    };
  }
  case 'INIT_GLADIATORS': {
    return {
      ...state,
      gladiators: action.payload
    };
  }
  case 'NEW_BATTLE_DETECTED': {
    const nw = state.battles.slice(0);
    nw.push(action.payload);
    return {
      ...state,
      battles: nw
    };
  }
  case 'DEL_BATTLE_DETECTED': {
    let nw = state.battles.slice(0);
    for (let i = 0; i < nw.length; i += 1) {
      if (action.payload.id === nw[ i ].id) {
        nw = nw.slice(i, i + 1);
      }
    }
    return {
      ...state,
      battles: nw
    };
  }
  default: {
    return state;
  }
  }
}
