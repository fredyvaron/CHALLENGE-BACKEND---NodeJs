const {DataTypes} = require('sequelize');

module.exports = (sequelize ) =>{
    sequelize.define("personaje",{

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        imagen: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        edad: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        peso: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        historia: {
            type: DataTypes.TEXT,
            allowNull: false,
        }

    })
}