module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Events', 'content', {
      type: Sequelize.TEXT,
      allowNull: false
    });
  },
  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Events', 'content');
  }
};