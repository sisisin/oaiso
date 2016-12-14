const assert = require('power-assert');
const db = require('../../../../server/models/');
const event = require('../../../../server/routes/api/event');

const baseCircle = { id: 1, name: 'forty_tow', twitter_id: '42' };
const baseEvents = [{ id: 1, circle_id: 42, name: 'C90 1日目', date: new Date(2016, 7, 12) }, { id: 2, circle_id: 42, name: 'C90 3日目', date: new Date(2016, 7, 14) }];

describe('event.list', () => {
  beforeEach(() => {
    return db.Event.bulkCreate(baseEvents)
      .then(() => db.Circle.create(baseCircle));
  });
  afterEach(() => {
    return db.Event.truncate()
      .then(() => db.Circle.truncate());
  });

  it('found event by circle_id', (done) => {
    const req = { query: { circle_id: 42 } };
    const res = { json(events) { assert.deepEqual(baseEvents, events); done(); } };
    event.list(req, res);
  });
  it('not found event by not exist circle_id', (done) => {
    const req = { query: { circle_id: 1 } };
    const res = { json(events) { assert.deepEqual([], events); done(); } };
    event.list(req, res);
  });
});

describe('event.post', () => {
  describe('create new event', () => {
    afterEach(() => db.Event.truncate());

    const req = {
      body: {
        circle_id: baseEvents[0].circle_id
        , name: baseEvents[0].name
        , date: baseEvents[0].date
      }
    };
    it('should event.id typeof number, and it is inserted incremental', (done) => {
      const res = { json(event) { assert(typeof event.id === 'number'); done(); } };
      event.post(req, res);
    });
    it('should event.name equals request body', (done) => {
      const res = { json(event) { assert(event.name === req.body.name); done(); } };
      event.post(req, res);
    });
    it('should event.date equals request body', (done) => {
      const res = { json(event) { assert(event.date.getTime() === req.body.date.getTime()); done(); } };
      event.post(req, res);
    });
  });
  describe('cannot create when not has required param', () => {
    afterEach(() => db.Event.truncate());
    const {circle_id, name, date} = baseEvents[0];
    const res = { json(event) { assert(event === null); } };
    it('dose not have circle_id', () => {
      const req = { body: { name, date } };
      event.post(req, res);
    });
    it('dose not have name', () => {
      const req = { body: { circle_id, date } };
      event.post(req, res);
    });
    it('dose not have date', () => {
      const req = { body: { circle_id, name } };
      event.post(req, res);
    });
  });
});
describe('event.param', () => {
  it('should exec done()', () => {
    const next = () => { assert.ok; };
    event.param({}, {}, next, '1');
  });
  it('should response status 400 when id is wrong', () => {
    const res = {
      status(resCode) {
        assert(resCode === 400);
        return { end() { assert.ok; } }
      }
    };
    event.param({}, res, {}, 'a');
  });
});

describe('event.delete', () => {
  beforeEach(() => db.Event.create(baseEvents[0]));
  afterEach(() => db.Event.truncate());
  it('should deleted event', (done) => {
    const req = { id: baseEvents[0].id };
    const res = {
      status(resCode) {
        assert(resCode === 200);
        return { end() { assert.ok; done(); } };
      }
    };
    event.delete(req, res);
  });
  it('should respond status 400 when not exist event', (done) => {
    const req = { id: 40 };
    const res = {
      status(resCode) {
        return { end() { assert(resCode === 400); done(); } };
      }
    };
    event.delete(req, res);
  });
});

describe('event.put', () => {
  beforeEach(() => db.Event.create(baseEvents[0]));
  afterEach(() => db.Event.truncate());
  it('should updated', (done) => {
    const newEvent = {
      id: baseEvents[0].id
      , circle_id: baseEvents[0].circle_id
      , name: baseEvents[0].name
      , date: new Date('2016-08-13')
    };
    const req = {
      id: newEvent.id, body: {
        circle_id: newEvent.circle_id
        , name: newEvent.name
        , date: newEvent.date
      }
    };
    const res = {
      json(event) {
        assert.deepEqual(event, newEvent);
        done();
      }
    };
    event.put(req, res);
  });
});
