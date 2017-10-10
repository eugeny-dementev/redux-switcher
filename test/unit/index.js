const Lab = require('lab');
const lab = exports.lab = Lab.script();
const { experiment, test } = lab;

const assert = require('assert');

const createReducerSwitcher = require('../../src/index');

experiment('createReducerSwitcher', () => {
  test('should return object with to functions { reducer, switch }', (done) => {
    const reducerSwitcher = createReducerSwitcher();

    assert.equal('object', typeof reducerSwitcher);
    assert.equal('function', typeof reducerSwitcher.reducer);
    assert.equal('function', typeof reducerSwitcher.switch);

    done();
  });

  test('should throw error in default reducer', (done) => {
    const reducerSwitcher = createReducerSwitcher();

    assert.throws(() => {
      reducerSwitcher.reducer();
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
