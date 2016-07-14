const assert = require('power-assert');
const sinon = require('sinon');
const { get } = require('../../../server/routes/index');
const { appTitle } = require('../../../server/config/app');

describe('index get', () => {
  const spy = sinon.spy();
  const spyReq = { session: { passport: 'passportObject' } };
  const spyRes = { render: spy };

  beforeEach(() => { get(spyReq, spyRes); });

  it('render func called once', () => {
    assert(spy.calledOnce);
  });

  it('render func called with title and request object', () => {
    assert(spy.calledWith('index', { title: appTitle, session: spyReq.session.passport }));
  });
});