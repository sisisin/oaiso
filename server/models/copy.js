'use strict';
module.exports = function (sequelize, DataTypes) {
  var Copy = sequelize.define('Copy', {
    circle_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    circulation: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    price: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
        }
      }
    });
  return Copy;
};