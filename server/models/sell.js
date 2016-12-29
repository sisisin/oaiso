'use strict';
module.exports = function(sequelize, DataTypes) {
  var Sell = sequelize.define('Sell', {
      copy_id: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      price: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      num_of_sold: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      sold_time: {
        allowNull: false,
        type: DataTypes.DATE
      },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Sell;
};