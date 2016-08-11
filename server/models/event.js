'use strict';
module.exports = function (sequelize, DataTypes) {
  var Event = sequelize.define('Event', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    circle_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    date: {
      allowNull: false,
      type: DataTypes.DATE
    },
  }, {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
        }
      }
    });
  return Event;
};