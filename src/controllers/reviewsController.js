const { Review, Bicicleta } = require('../models/associations')


exports.new = async (req, res, next) => {
    try {
        const { bicicletaId } = req.query
        res.render('reviews/new', { bicicletaId })
    } catch (error) {
        next(error)
    }
}

exports.create = async (req, res, next) => {
    try {
        const { comentario, calificacion, bicicletaId } = req.body

        if (!comentario || !calificacion || !bicicletaId) {
            return res.status(400).send('Todos los campos son obligatorios!')
        }

        const review = await Review.create({
            comentario,
            calificacion: parseInt(calificacion),
            bicicletaId: parseInt(bicicletaId)
        })

        console.log('Reseña creada exitosamente', review)

        const msg = encodeURIComponent('Reseña creada exitosamente!')

        res.redirect(`/bicicletas/${bicicletaId}?success=${msg}`)
    } catch (error) {
        next(error)
    }
}

exports.edit = async (req, res, next) => {

}

exports.update = async (req, res, next) => {

}

exports.delete = async (req, res, next) => {

}