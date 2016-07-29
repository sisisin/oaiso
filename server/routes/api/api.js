const api = require('express').Router();
const update = require('./update');
const profile = require('./profile');
const circle = require('./circle');

api.post('/update', update.post);
api.get('/profile', profile.get);
api.get('/circle', circle.get);

module.exports = { api };
