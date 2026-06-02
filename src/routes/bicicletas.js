const express = require('express')
const router = express.Router()
const bicicletasController = require('../controllers/bicicletasController')

//aqui iran las rutas 
//lista de todas las bicicletas
//a todas estas rutas express le antepone /bicicletas, de acuerdo a lo cnfigurado en el archivo server.js
router.get('/', bicicletasController.index) //  /bicicletas/
//Formulario crear bicicleta
router.get('/new', bicicletasController.new) // /bicicletas/new
//ruta post para crear bicicletas en la bdd
router.post('/', bicicletasController.create)  //    /bicicletas/
//muestra 1 bicicleta en base a su id
router.get('/:id', bicicletasController.show) //    /bicicletas/:id
//ruta con el formulario para editar una bicicleta en base a su id
router.get('/:id/edit', bicicletasController.edit) //    /bicicletas/:id/edit
//ruta put para actualizar bicicletas en la bdd
router.put('/:id', bicicletasController.update) //    /bicicletas/:id
//ruta delete para eliminar una bicicleta en base a su id
router.delete('/:id', bicicletasController.delete) //    /bicicletas/:id


module.exports = router