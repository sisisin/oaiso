'use strict';
module.exports = function (sequelize, DataTypes) {
  var Circle = sequelize.define('Circle', {
    twitter_id: {
      type: DataTypes.STRING
      , unique: true
      , allwoNull: false
    },
    name: {
      type: DataTypes.STRING
      , allwoNull: false
    }
  }, {
      classMethods: {
        associate: function (models) {
          // associations can be defined here
        }
      }
    });
  return Circle;
};