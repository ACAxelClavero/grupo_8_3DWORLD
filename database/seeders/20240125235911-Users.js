'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const roleId = await queryInterface.rawSelect('roles', {
      where: { name: 'Cliente' },
    }, ['id']);

    await queryInterface.bulkInsert('users', [{
      id: '1',
      name: 'Martin',
      email: 'martin@gmail.com',
      password: '12345678',
      lastname: 'Sanchez',
      roles_id: roleId,

    }], {});
 },
  

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});

  }
};
