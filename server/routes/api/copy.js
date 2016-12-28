const param = (req, res, next, id) => {
  req.id = id;  // todo findbydb
  next();
};

const put = (req, res) => {
  const {title, circulation, price} = req.body;
  res.json({ id: req.id, title, circulation, price });
};

const post = (req, res) => {
  const {title, circulation, price} = req.body;
  if (title == null || title === '') return res.json(null);
  if (circulation == null || circulation === '') return res.json(null);
  if (price == null || price === '') return res.json(null);
  res.json({ id: 42, title, circulation, price });
};

module.exports = { param, post, put };
