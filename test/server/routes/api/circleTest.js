const assert = require('power-assert');
const db = require('../../../../server/models/');
const circle = require('../../../../server/routes/api/circle');

const baseCircle = { id: 1, name: 'forty_tow', twitter_id: '42' };

describe('circle.get', () => {
  const req = { session: { passport: { user: { id: '42' } } } };
  afterEach(() => db.Circle.truncate());

  it('session user not found', () => {
    const res = { json(obj) { assert(obj === null); } };
    circle.get(req, res);
  });

  it('found circle by twitter_id', () => {
    return db.Circle
      .create(baseCircle)
      .then(() => {
        const res = { json(circle) { assertCircleItem(baseCircle, circle); } };
        circle.get(req, res);
      });
  });
});

describe('circle.post', () => {
  describe('create new circle', () => {
    afterEach(() => db.Circle.truncate());
    const req = {
      session: { passport: { user: { id: '42' } } }
      , body: { name: 'FortyTwo' }
    };
    it('circle.id typeof number, and it is inserted incremental', () => {
      const res = { json(circle) { assert(typeof circle.id === 'number'); } };
      circle.post(req, res);
    });
    it('circle.name equals request body', () => {
      const res = { json(circle) { assert(circle.name === req.body.name); } };
      circle.post(req, res);
    });
    it('circle.twitter_id equals session object id', () => {
      const res = { json(circle) { assert(circle.twitter_id === req.session.passport.user.id); } };
      circle.post(req, res);
    });

  });
});

describe('circle.param', () => {
  afterEach(() => db.Circle.truncate());
  it('status 400 when circle not found', () => {
    res = {
      status(httpStatus) {
        assert(httpStatus === 400);
        return { end() { assert.ok; } };
      }
    };
    circle.param('', res);
  });
  it('called next() when circle found', () => {
    return db.Circle
      .create(baseCircle)
      .then(c => {
        const req = {};
        const next = () => {
          assertCircleItem(baseCircle, req.circle.toJSON());
        };
        circle.param(req, null, next, baseCircle.id);
      });
  });
});

describe('circle.put', () => {
  afterEach(() => db.Circle.truncate());

  it('should return a updated item', (done) => {
    db.Circle
      .create(baseCircle)
      .then(c => {
        const req = { body: { name: 'updatedName' }, circle: c };
        const res = {
          json(circle) {
            const expect = Object.assign({}, baseCircle, { name: req.body.name });
            assertCircleItem(expect, circle);
            done();
          }
        };
        circle.put(req, res);
      });
  });
  it('should update db', (done) => {
    db.Circle
      .create(baseCircle)
      .then(c => {
        const req = { body: { name: 'updatedName' }, circle: c };
        const res = {
          json() {
            db.Circle
              .findById(baseCircle.id)
              .then(c => {
                const expect = Object.assign({}, baseCircle, { name: req.body.name });
                assertCircleItem(expect, c.toJSON());
                done();
              });
          }
        };
        circle.put(req, res);
      });
  });
});

function assertCircleItem(expect, {id, name, twitter_id}) {
  assert.deepEqual({ id, name, twitter_id }, expect);
}
