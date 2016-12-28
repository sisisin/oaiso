const put = (req, res) => {
  const {title, circulation, price} = req.body;
  if (title == null || title === '') return res.json(null);
  if (circulation == null || circulation === '') return res.json(null);
  if (price == null || price === '') return res.json(null);
  res.json({id:42, title, circulation, price});
};

module.exports = { put };
