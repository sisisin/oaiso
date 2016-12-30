'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Copies', 'cost', {
      allowNull: false,
      type: Sequelize.INTEGER,
      defaultValue: 0
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Copies', 'cost');
  }
};
