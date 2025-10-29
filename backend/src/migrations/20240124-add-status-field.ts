import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.addColumn('users', 'status', {
      type: DataTypes.ENUM('pending', 'approved', 'rejected'),
      allowNull: false,
      defaultValue: 'pending',
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn('users', 'status');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_users_status";');
  }
};