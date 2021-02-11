const { Router } = require('express');
const grado_controller = require('../controllers/grado');
const grado_router = Router();

grado_router.post('/grado', grado_controller.crearGrado);
grado_router.get('/grado', grado_controller.listarGrados);
grado_router.get('/gradoFilter', grado_controller.listarGradoByNumero);
grado_router.post('/subirFotoGrado/:grado_id', grado_controller.subirFotoById);

module.exports = grado_router;