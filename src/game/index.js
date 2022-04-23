//@ts-check
const { User, Player, Game, transaction } = require('../model');

const findPlayer = async (id) => {
  const player = await Player.findByPk(id, { include: [{ model: User, as: 'user' }] });
}

const findPlayers = () => Player.findAll({ include: [{ model: User, as: 'user' }] });

const createUserAndPlayer = async ({name, email, password}) => {
  const t = await transaction();
  try {
    const user = await User.create(
      {
        name,
        email,
        password
      },
      { isNewRecord: true, returning: true, transaction: t }
    );
    await Player.create({ userId: user.dataValues.id }, { isNewRecord: true, returning: true, transaction: t });
    await t.commit();
    return user;
  } catch (error) {
    await t.rollback();
    throw error;
  }  
}

const createGame = async ({ players, scores }) => {
  const game = await Game.create({ scores }, { isNewRecord: true, returning: true});
  await game.addPlayers(players);
  return game;
}

const findGame = (id) => Game.findByPk(id);

module.exports = {
  findPlayer,
  findPlayers,
  createUserAndPlayer,
  createGame,
  findGame,
};
