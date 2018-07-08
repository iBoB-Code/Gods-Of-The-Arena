const defaults = {
  battles: [],
  types: [],
  gladiators: [],
  fetching: false,
  connected: false,
  animals: {},
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
    const animals = {};
    for (let i = 0; i < action.payload.length; i += 1) {
      if (action.payload[ i ].type.name === 'animal') {
        animals[ action.payload[ i ].name ] = 0;
      }
    }
    return {
      ...state,
      gladiators: action.payload,
      animals
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
    const nw = state.battles.slice(0);
    for (let i = 0; i < nw.length; i += 1) {
      if (action.payload.id === nw[ i ]._id) {
        nw.splice(i, 1);
      }
    }
    return {
      ...state,
      battles: nw
    };
  }
  case 'SOCKET_TICK': {
    return {
      ...state,
      connected: action.payload.state.connected
    };
  }
  case 'UPDATE_ANIMAL_COUNT': {
    const nw = { ...state.animals };
    nw[ action.payload.animal ] = state.animals[ action.payload.animal ] + action.payload.i;
    nw[ action.payload.animal ] = nw[ action.payload.animal ] < 0 ? 0 : nw[ action.payload.animal ];
    return {
      ...state,
      animals: nw
    };
  }
  default: {
    return state;
  }
  }
}
