const express = require('express')
const router = express.Router()
const bicicletasController = require('../controllers/bicicletasController')

//aqui iran las rutas 
//lista de todas las bicicletas
router.get('/', bicicletasController.index)
//Formulario crear bicicleta
router.get('/new', bicicletasController.new)
//ruta post para crear bicicletas en la bdd
router.post('/', bicicletasController.create)
//muestra 1 bicicleta en base a su id
router.get('/:id', bicicletasController.show)
//ruta con el formulario para editar una bicicleta en base a su id
router.get('/:id/edit', bicicletasController.edit)
//ruta put para actualizar bicicletas en la bdd
router.put('/:id', bicicletasController.update)
//ruta delete para eliminar una bicicleta en base a su id
router.delete('/:id', bicicletasController.delete)


module.exports = router