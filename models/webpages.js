module.exports = (sequelize, DataTypes) => {
    return sequelize.define('webpages', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        timing: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    });
};
