//@ts-check
const { User, Player, Game, transaction } = require('../model');
const { hash } = require('../util');
const jwt = require('jsonwebtoken');

const login = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error('User not found');
  }
  if (hash(password, email) !== user.password) {
    throw new Error('Invalid password');
  }
  const token = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET);
  return { token, user };
};

const validateToken = (token) => jwt.verify(token, process.env.JWT_SECRET);

module.exports = {
  login,
  validateToken,
}
