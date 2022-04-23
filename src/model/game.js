//@ts-check
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define('Game', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  // Scoring: A match is played best 3 of 5 games (or 4/7 or 5/9).
  // For each game, the first player to reach 11 points wins that game, however a game must be won by at least a two point margin.
  scores: {
    type: DataTypes.ARRAY(DataTypes.SMALLINT), // 1 = player1 wins, 2 = player2 wins
    allowNull: false
  }
});
