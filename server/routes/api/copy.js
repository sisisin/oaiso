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
  const query = `
    select c.*, cir.twitter_id, (c.circulation - sum(s.num_of_sold)) as present_circulation
    from "Circles" as cir
      left join "Copies" as c on cir.id = c.circle_id
      left join "Sells" as s on c.id = s.copy_id
    where cir.twitter_id = '${req.session.passport.user.id}'
    group by c.id, cir.twitter_id
`;
  db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT })
    .then(copies => {
      res.json(copies);
    });
};

const put = (req, res) => {
  const {title, circulation, price, cost} = req.body;

  req.copy.set({ title, circulation, price, cost });
  req.copy.save()
    .then(c => { res.json(c.toJSON()); });
};

const post = (req, res) => {
  const {title, circulation, price, cost} = req.body;
  if (title == null || title === '') return res.json(null);
  if (circulation == null || circulation === '') return res.json(null);
  if (price == null || price === '') return res.json(null);
  if (cost == null || cost === '') return res.json(null);

  // todo: join
  db.Circle.findOne({ where: { twitter_id: req.session.passport.user.id } })
    .then(c => {
      return db.Copy.create({
        circle_id: c.id, title, circulation, price, cost
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
