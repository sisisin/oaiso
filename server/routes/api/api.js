const api = require('express').Router();
const update = require('./update');
const profile = require('./profile');

api.post('/update', update.post);
api.get('/profile', profile.get);

module.exports = { api };
