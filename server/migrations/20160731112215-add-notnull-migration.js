'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn('Circles', 'name', {
      type: Sequelize.STRING
      , allowNull: false
    }).then(() => {
      return queryInterface.changeColumn('Circles', 'twitter_id', {
        type: Sequelize.STRING
        , allowNull: false
      });
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn('Circles', 'name', {
      type: Sequelize.STRING
    }).then(() => {
      return queryInterface.changeColumn('Circles', 'twitter_id', {
        type: Sequelize.STRING
        , unique: true
      });
    });
  }
};
