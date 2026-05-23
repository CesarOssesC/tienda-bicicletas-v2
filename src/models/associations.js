const Bicicleta = require('./Bicicleta')
const Compra = require('./Compra')
const CompraBicicleta = require('./CompraBicicleta')
const sequelize = require('../config/db')


//Relacion muchos a muchos entre bicicletas y compras
Compra.belongsToMany(Bicicleta, {
    through: CompraBicicleta,
    foreignKey: 'compraId',
    onDelete: 'CASCADE'
})

Bicicleta.belongsToMany(Compra, {
    through: CompraBicicleta,
    foreignKey: 'bicicletaId',
    onDelete: 'CASCADE'
})


module.exports = {
    sequelize,
    Bicicleta,
    Compra,
    CompraBicicleta
}
