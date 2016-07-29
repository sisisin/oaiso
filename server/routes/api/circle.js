const db = require('../../models/');

const param = (req, res, next, id) => {
  db.Circle
    .findById(id)
    .then(circle => {
      if (circle === null) { return res.status(400).end(); }
      req.circle = circle;
      next();
    });
};

const get = (req, res, next) => {
  const {id} = req.session.passport.user;
  db.Circle
    .findOne({ where: { twitter_id: id } })
    .then(c => { res.json(c && c.toJSON()); });
};
const post = (req, res, next) => {
  const {name} = req.body;
  const twitter_id = req.session.passport.user.id;
  db.Circle
    .create({ name, twitter_id })
    .then(c => { res.json(c && c.toJSON()); });
};
const put = (req, res) => {
  const {name} = req.body;
  req.circle.set({ name });
  req.circle
    .save()
    .then(c => { res.json(c.toJSON()); });
};
module.exports = { get, post, put, param };
