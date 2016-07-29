const assert = require('power-assert');
const db = require('../../../../server/models/');
const circle = require('../../../../server/routes/api/circle');

describe('circle.get', () => {
  it('session user not found', () => {
    const req = { session: { passport: { user: { id: 'noting' } } } };
    const res = {
      json(obj) {
        assert(obj === null);
      }
    };
    circle.get(req, res);
  });
});
describe('circle.post', () => {
  describe('create new circle', () => {
    const req = {
      session: { passport: { user: { id: '42' } } }
      , body: { name: 'FortyTwo' }
    };
    afterEach((done) => {
      db.Circle
        .truncate()
        .then(() => { done(); });
    });
    it('circle.id is incremental insert', () => {
      const res = { json(circle) { assert(circle.id, 1); } };
      circle.post(req, res);
    });
    it('circle.name equals request body', () => {
      const res = { json(circle) { assert(circle.name, req.body.name); } };
      circle.post(req, res);
    });
    it('circle.twitter_id equals session object id', () => {
      const res = { json(circle) { assert(circle.twitter_id, req.session.passport.user.id); } };
      circle.post(req, res);
    });
  });
});