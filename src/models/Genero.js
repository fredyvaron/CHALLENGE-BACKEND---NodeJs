const { DataTypes } = require("sequelize")

module.exports = (sequelize) =>{
    sequelize.define("genero", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull:false,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        imagen:  {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
}