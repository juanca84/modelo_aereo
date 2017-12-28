module.exports = function () {
  const key = "dcfffc5a48b54815ab058c26f818e901";
  const secret = "afc03a0ebcdc4e7f99e20a32e661d172";
  const jwt = require('jsonwebtoken');
  return jwt.sign({ "iss": key }, secret, { "noTimestamp": true });
}
