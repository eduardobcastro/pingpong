//@ts-check
const { DataTypes } = require('sequelize');

module.exports = (sequelize, Game, Player) =>
  sequelize.define('GamePlayers', {
    PlayerId: {
      type: DataTypes.INTEGER,
      references: {
        model: Player,
        key: 'id'
      }
    },
    GameId: {
      type: DataTypes.INTEGER,
      references: {
        model: Game,
        key: 'id'
      }
    }
  });
