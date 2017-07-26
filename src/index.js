module.exports = function createReducerSwitcher (reducers = {}) {
  let currentReducer = defaultReducer;
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

function defaultReducer () {
  throw new Error('ReducerSwitcher: This is a stub. Switch to one of passed reducers before dispatch actions');
}
