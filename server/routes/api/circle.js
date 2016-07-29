const db = require('../../models/');

const get = (req, res, next) => {
  const {id} = req.session.passport.user;
  db.Circle
    .findOne({ where: { twitter_id: id } })
    .then(circle => {
      res.json(circle);
    });
};
const post = (req, res, next) => {
  const {name} = req.body;
  const twitter_id = req.session.passport.user.id;
  db.Circle
    .create({ name, twitter_id })
    .then(c => {
      res.json(c);
    });
};
module.exports = { get, post };
