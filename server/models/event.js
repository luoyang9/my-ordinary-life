module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: models => {
        Event.belongsTo(models.User, {
          foreignKey: 'userId',
          onDelete: 'CASCADE'
        })
      }
    }
  });
  return Event;
};