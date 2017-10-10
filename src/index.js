module.exports = function createReducerSwitcher (reducers = {}) {
  const reducerNames = Object.keys(reducers);

  if (reducerNames.length == 0) {
    throw new Error('No reducers passed');
  }

  const firstReducer = reducers[reducerNames[0]];

  if (typeof firstReducer !== 'function') {
    throw Error(`${reducerNames[0]} reducer is not a function`);
  }

  let currentReducer = firstReducer;
  return {
    reducer: (...args) => currentReducer(...args),
    switch: (name) => {
      if (typeof reducers[name] !== 'function') {
        throw new Error(`"${name}" reducer is not a function or not exists in reducers object`);
      }

      currentReducer = reducers[name];
    },
  };
};
