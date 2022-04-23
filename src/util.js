const crypto = require('crypto');
const hash = (str, salt) => crypto.createHmac('sha256', salt).update(str).digest('hex');

module.exports = {
  hash,
}
