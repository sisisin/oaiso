const config = require('../../config/secret');

const get = (req, res) => {
  const {id, photos, displayName} = req.session.passport.user;
  res.json({ id, photos, displayName });
};

module.exports = { get };
