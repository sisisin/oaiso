'use strict';
module.exports = function(sequelize, DataTypes) {
  var Circle = sequelize.define('Circle', {
    twitter_id: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Circle;
};