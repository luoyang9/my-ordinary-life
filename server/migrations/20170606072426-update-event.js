module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Events', 'publishDate', {
      type: Sequelize.DATE,
      allowNull: false
    });
    queryInterface.addColumn('Events', 'content', {
      type: Sequelize.TEXT,
      allowNull: false
    });
  },
  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Events', 'publishDate');
    queryInterface.removeColumn('Events', 'content');
  }
};