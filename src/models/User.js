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

        }, 
        email: {
            type: DataTypes.STRING,
            validate : {
                isEmail: {
                    msg: 'Ingrese un email valido'
                },
            }
        },
        clave: {
            type: DataTypes.STRING,

        }
    })
} 