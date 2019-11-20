module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('registrations', {
      student_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primarykey: true,
      },
      plan_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primarykey: true,
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: null,
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: null,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: null,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: null,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: null,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('registrations');
  },
};
