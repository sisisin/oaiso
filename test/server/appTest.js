const assert = require('power-assert');
const request = require('supertest');
const app = require('../../server/app');

describe('routing index', () => {
  it('should redirect "/login when not authorized"', (done) => {
    request(app)
      .get('/')
      .end((err, ret) => {
        if (err) throw err;
        assert(ret.res.headers['content-type'] === 'text/plain; charset=utf-8');
        assert(ret.res.statusCode === 302);
        done();
      });
  });
});
