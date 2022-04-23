//@ts-check
const { DataTypes } = require('sequelize');
const { hash } = require('../util');

module.exports = (sequelize) =>
  sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        // @ts-ignore
        this.setDataValue('password', hash(value, this.email));
      }
    }
  });
