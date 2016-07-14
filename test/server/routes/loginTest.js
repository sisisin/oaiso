const assert = require('power-assert');
const sinon = require('sinon');
const { get } = require('../../../server/routes/login');
const { appTitle } = require('../../../server/config/app');

describe('login GET', () => {
  const spy = sinon.spy();
  const spyRes = { render: spy };

  it('render with title', () => {
    get(undefined, spyRes);
    assert(spy.calledWith('login', { title: appTitle }));
  });
});