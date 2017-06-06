module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Users', 'password', {
      type: Sequelize.STRING,
      allowNull: false
    });
    queryInterface.addColumn('Users', 'salt', {
      type: Sequelize.STRING,
      allowNull: false
    })
  },
  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Users', 'password');
    queryInterface.removeColumn('Users', 'salt');
  }
};