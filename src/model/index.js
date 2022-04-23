const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
  host: process.env.POSTGRES_HOST,
  dialect: 'postgres'
});

async function sequelizeConnect() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

const User = require('./user')(sequelize);
const Player = require('./player')(sequelize);
const Game = require('./game')(sequelize);
const GamePlayers = require('./game-players')(sequelize, Game, Player);

Player.belongsTo(User, { as: 'user' });
Game.belongsToMany(Player, { as: 'players', through: 'GamePlayers' });
Player.belongsToMany(Game, { as: 'games', through: 'GamePlayers' });

sequelizeConnect().then(async () => {
  // TODO: calling sync is not necessary if you don't need to create tables
  await User.sync();
  await Player.sync();
  await Game.sync();
  await GamePlayers.sync();
}).catch(error => console.error(error));

module.exports = {
  User,
  Player,
  Game,
  transaction: () => sequelize.transaction()
};
