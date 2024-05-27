'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Calendar', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            dd_mm_yyyy: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            date: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            month: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            year: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            category: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                }
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                onUpdate: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Calendar');
    }
};