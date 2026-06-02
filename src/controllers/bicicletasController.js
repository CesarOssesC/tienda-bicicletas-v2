const { raw } = require('express')
const { Bicicleta, Review } = require('../models/associations')

exports.index = async (req, res, next) => {
    try {
        const { success } = req.query
        const bicicletas = await Bicicleta.findAll({
            order: [['id', 'ASC']],
            raw: true
        })
        res.render('bicicletas/index', { bicicletas, success })
    } catch (error) {
        next(error)
    }
}

exports.show = async (req, res, next) => {
    try {
        const { id } = req.params
        const { success } = req.query
        const bicicleta = await Bicicleta.findByPk(id, {
            include: [{ model: Review, order: [['updatedAt', 'DESC']] }]
        })
        if (!bicicleta) return res.status(404).send(`Bicicleta con el id: ${id} no encontrada`)

        const biciDatoPlano = {
            ...bicicleta.get({ plain: true })
        }
        
        res.render('bicicletas/show', { bicicleta: biciDatoPlano, success })
    } catch (error) {
        next(error)
    }
}

exports.new = async (req, res, next) => {
    try {
        res.render('bicicletas/new')
    } catch (error) {
        next(error)
    }
}

exports.create = async (req, res, next) => {
    try {
        const { marca, modelo, tipo, precio, disponible, year } = req.body
        
        if (!marca || !modelo || !tipo || !precio || !year) {
            res.status(400).send('Todos los datos son obligatorios!')
        }

        const nuevaBici = await Bicicleta.create({
            marca, modelo, tipo, precio: parseFloat(precio), disponible, year: parseInt(year)
        })

        console.log('Se ha creado una nueva bicicleta: ', nuevaBici)

        const msg = encodeURIComponent('Bicicleta creada exitosamente!')

        res.redirect(`/bicicletas?success=${msg}`)
    } catch (error) {
        next(error)
    }
}

exports.edit = async (req, res, next) => {
    try {
        const { id } = req.params

        const bicicleta = await Bicicleta.findByPk(id)

        if (!bicicleta) return res.status(404).send(`Bicicleta con el id: ${id} no encontrada`)

        const biciDatoPlano = {
            ...bicicleta.get({ plain: true })
        }

        const tipos = ['mtb', 'ruta', 'trail', 'enduro', 'bmx'].map(tipo => ({
            value: tipo,
            selected: tipo === biciDatoPlano.tipo
        }))

        res.render('bicicletas/edit', { bicicleta: biciDatoPlano, tipos })
    } catch (error) {
        next(error)
    }
}

exports.update = async (req, res, next) => {
    try {
        const { id } = req.params
        const { marca, modelo, tipo, precio, disponible, year } = req.body
    
        const bici = await Bicicleta.findByPk(id)

        if (!bici) return res.status(404).send(`Bicicleta con el id: ${id} no encontrada`)

        const biciActualizada = await bici.update({ marca, modelo, tipo, precio: parseFloat(precio), disponible, year: parseInt(year) })
        
        console.log(`Se ha actualizado la bicicleta id: ${id}: `, biciActualizada)
        const msg = encodeURIComponent('Bicicleta actualizada exitosamente!')
        res.redirect(`/bicicletas/${id}?success=${msg}`)
    } catch (error) {
        next(error)
    }
}

exports.delete = async (req, res, next) => {
    try {
        const { id } = req.params

        const bici = await Bicicleta.findByPk(id)

        if (!bici) return res.status(404).send(`Bicicleta con el id: ${id} no encontrada`)

        const biciEliminada = await bici.destroy()

        console.log('Bicicleta eliminada exitosamente: ', biciEliminada)
        const msg = encodeURIComponent('Bicicleta eliminada exitosamente!')
        res.redirect(`/bicicletas?success=${msg}`)
    } catch (error) {
        next(error)
    }
    
}