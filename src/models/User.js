const { DataTypes} = require('sequelize')

module.exports = (sequelize) =>{
    sequelize.define('user',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        }, 
        nombre: {
            type: DataTypes.STRING,
            required: true,
        }, 
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate : {
                isEmail: {
                    msg: 'Ingrese un email valido'
                },
            }
        },
        clave: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
} 