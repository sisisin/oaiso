const api = require('express').Router();
const update = require('./update');
const profile = require('./profile');
const circle = require('./circle');

api.post('/update', update.post);
api.get('/profile', profile.get);
api.get('/circle', circle.get);
api.post('/circle', circle.post);
api.param('id', circle.param);
api.put('/circle/:id', circle.put);

module.exports = { api };
