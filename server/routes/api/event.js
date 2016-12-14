const db = require('../../models/');

module.exports = {
  list(req, res) {
    db.Event
      .findAll({ where: { circle_id: req.query.circle_id } })
      .then(evs => {
        res.json(evs.map(e => {
          const {id, circle_id, name, date} = e.toJSON();
          return { id, circle_id, name, date };
        }));
      });
  }
  , post(req, res) {
    const {circle_id, name, date} = req.body;
    if (
      name == null || name === ''
      || circle_id == null || circle_id === ''
      || date instanceof Date === false
    ) return res.json(null);

    db.Event
      .create({ circle_id, name, date })
      .then(c => { res.json(c && c.toJSON()); });
  }
  , param(req, res, next, id) {
    if (Number.isNaN(parseInt(id))) { return res.status(400).end(); }
    req.id = id;
    next();
  }
  , put(req, res) {
    const { circle_id, name, date } = req.body;
    if (
      name == null || name === ''
      || circle_id == null || circle_id === ''
      || date instanceof Date === false
    ) return res.json(null);

    db.Event.findById(req.id)
      .then(e => {
        e.set({ circle_id, name, date });
        return e.save();
      })
      .then(e => {
        if (e === null) return res.status(400).end();
        const {id, circle_id, name, date} = e.toJSON();
        res.json({ id, circle_id, name, date });
      });

  }
  , delete(req, res) {
    db.Event.findById(req.id)
      .then(e => {
        if (e === null) return res.status(400).end();
        return e.destroy()
          .then(() => res.status(200).end(), () => res.status(400).end());
      });
  }
};
