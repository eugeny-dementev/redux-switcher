const redux = require('redux');

const Lab = require('lab');
const lab = exports.lab = Lab.script();
const { experiment, test } = lab;

const assert = require('assert');

const createReducerSwitcher = require('../../src/index');

experiment('createReducerSwitcher', () => {
  test('should return object with to functions { reducer, switch }', (done) => {
    const reducerSwitcher = createReducerSwitcher({ one: () => {} });

    assert.equal('object', typeof reducerSwitcher);
    assert.equal('function', typeof reducerSwitcher.reducer);
    assert.equal('function', typeof reducerSwitcher.switch);

    done();
  });

  test('should throw error if no reducer passed', (done) => {
    assert.throws(() => {
      createReducerSwitcher();
    }, Error);

    done();
  });

  test('should throw error if first reducer is not a function', (done) => {
    assert.throws(() => {
      createReducerSwitcher({ reducer: 'value' });
    }, Error);

    done();
  });

  test('should throw error if switch reducer to not a function', (done) => {
    const reducerSwitcher = createReducerSwitcher({ one: () => {} });

    assert.throws(() => {
      reducerSwitcher.switch('two');
    }, Error);

    done();
  });

  test('should switch to reducer by name', (done) => {
    function reducer () {
      done();
    }

    const reducerSwitcher = createReducerSwitcher({ reducer });

    reducerSwitcher.switch('reducer');
    reducerSwitcher.reducer();
  });

  test('should call current switched reducer with all arguments passed to switcher.reducer', (done) => {
    const args = ['state', 'action'];

    function reducer (...callArgs) {
      assert.deepEqual(args, callArgs);
      done();
    }

    const reducerSwitcher = createReducerSwitcher({ reducer });

    reducerSwitcher.switch('reducer');
    reducerSwitcher.reducer(...args);
  });
});

experiment('Redux', () => {
  let reducerSwitcher;
  let store;

  function reducerOne (state = {}, action) {
    return 'one';
  }

  function reducerTwo (state = {}, action) {
    return 'two';
  }

  test('should switch', (done) => {
    reducerSwitcher = createReducerSwitcher({
      one: reducerOne,
      two: reducerTwo,
    });

    store = redux.createStore(redux.combineReducers({
      value: reducerSwitcher.reducer,
    }));

    assert.strictEqual(store.getState().value, 'one');

    reducerSwitcher.switch('two');

    store.dispatch({ type: 'SOME_ACTION' });

    assert.strictEqual(store.getState().value, 'two');

    done();
  });
});
