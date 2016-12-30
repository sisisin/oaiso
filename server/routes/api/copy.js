const db = require('../../models');

const param = (req, res, next, id) => {
  // todo change validation
  db.Copy.findById(id)
    .then(c => {
      if (c === null) { return res.status(400).end(); }
      req.copy = c;
      next();
    });
};

const get = (req, res) => {
  res.json(req.copy.toJSON());
};

const list = (req, res) => {
  // todo: join
  db.Circle.findOne({ where: { twitter_id: req.session.passport.user.id } })
    .then(c => db.Copy.findAll({ where: { circle_id: c.id } }))
    .then(copies => {
      res.json(copies.map(c => c.toJSON()));
    });
};

const put = (req, res) => {
  const {title, circulation, price} = req.body;

  req.copy.set({ title, circulation, price });
  req.copy.save()
    .then(c => { res.json(c.toJSON()); });
};

const post = (req, res) => {
  const {title, circulation, price} = req.body;
  if (title == null || title === '') return res.json(null);
  if (circulation == null || circulation === '') return res.json(null);
  if (price == null || price === '') return res.json(null);

  // todo: join
  db.Circle.findOne({ where: { twitter_id: req.session.passport.user.id } })
    .then(c => {
      return db.Copy.create({
        circle_id: c.id, title, circulation, price
      });
    })
    .then(c => { res.json(c && c.toJSON()); });
};

const del = (req, res) => {
  // todo move to display_flag
  // req.copy.destroy()
  //   .then(() => { res.json(null); })
  res.json(null);
};
module.exports = { param, get, list, post, put, del };
