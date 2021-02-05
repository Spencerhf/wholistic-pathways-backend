'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class classes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  classes.init({
    name: DataTypes.STRING,
    date: DataTypes.DATE,
    time: DataTypes.STRING,
    spots: DataTypes.INTEGER,
    filledSpots: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'classes',
  });
  return classes;
};