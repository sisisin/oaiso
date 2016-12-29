const post = (req, res) => {
  if (isValidBody(req.body) === false) return res.json(null);
  // todo bulk insert to sell
  res.json({ ok: true });
};

function isValidBody(body) {
  return true;
}

module.exports = { post };
