const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define("peliculaoserie", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
    
        },
        imagen: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        calificacion: {
            type: DataTypes.ENUM,
            values: ["1","2","3","4","5"]

        },
        creacion: {
            type: DataTypes.DATE,
        }

    })
}