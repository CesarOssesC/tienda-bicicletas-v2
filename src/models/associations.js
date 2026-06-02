const Bicicleta = require('./Bicicleta')
const Compra = require('./Compra')
const CompraBicicleta = require('./CompraBicicleta')
const Review = require('./Review')
const Usuario = require('./Usuario')
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

//Relacion 1 a n entre bicicletas y reviews
Bicicleta.hasMany(Review, {
    foreignKey: 'bicicletaId',
    onDelete: 'CASCADE'
})

Review.belongsTo(Bicicleta, {
    foreignKey: 'bicicletaId',
    onDelete: 'CASCADE'
})

//Relacion 1 a n entre usuarios y reviews
Usuario.hasMany(Review, {
    foreignKey: 'usuarioId',
    onDelete: 'SET NULL'
})

Review.belongsTo(Usuario, {
    foreignKey: 'usuarioId',
    onDelete: 'SET NULL'
})

//Relacion 1 a n entre usuarios y compras
Usuario.hasMany(Compra, {
    foreignKey: 'usuarioId',
    onDelete: 'SET NULL'
})

Compra.belongsTo(Usuario, {
    foreignKey: 'usuarioId',
    onDelete: 'SET NULL'
})


module.exports = {
    sequelize,
    Bicicleta,
    Review,
    Compra,
    CompraBicicleta,
    Usuario
}
