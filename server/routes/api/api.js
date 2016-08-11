const api = require('express').Router();
const update = require('./update');
const profile = require('./profile');
const circle = require('./circle');
const event = require('./event');

api.post('/update', update.post);

api.get('/profile', profile.get);

api.param('id', circle.param);
api.get('/circle', circle.get);
api.post('/circle', circle.post);
api.put('/circle/:id', circle.put);

api.param('id', event.param);
api.get('/event', event.list);
api.post('/event', event.post);
api.put('/event/:id', event.put);
api.delete('/event/:id', event.delete);


module.exports = { api };
