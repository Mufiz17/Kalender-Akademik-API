module.exports = (sequelize, DataTypes) => {
    const calendar = sequelize.define('calendar', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        dd_mm_yyyy: {
            type: DataTypes.DATE,
            allowNull: false
        },
        date: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        month: {
            type: DataTypes.STRING,
            allowNull: false
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        }
    }, {
        tableName: 'calendar',
    });
    calendar.associate = (models) => {
        calendar.belongsTo(models.users, {
            foreignKey: 'userId',
            as: 'user'
        });
    }
    return calendar;
}