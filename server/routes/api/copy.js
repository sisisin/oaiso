const param = (req, res, next, id) => {
  req.id = id;  // todo findbydb
  next();
};

const get = (req, res) => {
  res.json({ id: 42, title: 'forty-two', circulation: 420, price: 4200 });
};

const list = (req, res) => {
  res.json([
    { id: 0, title: 'ほげ', circulation: 19, price: 500 },
    { id: 1, title: 'fugaa', circulation: 1, price: 100 },
  ]);
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

const del = (req, res) => {
  res.json(null);
};
module.exports = { param, get, list, post, put, del };
