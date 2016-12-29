const db = require('../../models');

const post = (req, res) => {
  if (isValidBody(req.body) === false) return res.json(null);
  // todo bulk insert to sell
  const values = req.body.map(({copyId, price,numOfSold,soldTime}) => {
    return {
      copy_id: copyId,
      price,
      num_of_sold: numOfSold,
      sold_time: soldTime
    };
  });
  db.Sell.bulkCreate(values)
    .then(result => {
      res.json({ ok: true });
    });
};

function isValidBody(body) {
  return body.filter(sell => {
    return sell.copyId == null || sell.copyId === ''
      || sell.price == null || sell.price === ''
      || sell.numOfSold == null || sell.numOfSold === ''
      || sell.soldTime == null || sell.soldTime === '';
  }).length === 0;
}

module.exports = { post };
