'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Cambia 'phone' a 'lastname' en la siguiente línea
    await queryInterface.renameColumn('Users', 'phone', 'lastname');
  },

  down: async (queryInterface, Sequelize) => {
    // Agrega el código para revertir el cambio si es necesario
    await queryInterface.renameColumn('Users', 'lastname', 'phone');
  },
};