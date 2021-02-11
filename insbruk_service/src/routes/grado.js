const { Router } = require('express');
const grado_controller = require('../controllers/grado');
const { wachiman, validarAdminAndProfe } = require('../utils/Validador');
const grado_router = Router();

grado_router.post('/grado', validarAdminAndProfe, grado_controller.crearGrado);
grado_router.get('/grado', validarAdminAndProfe, grado_controller.listarGrados);
grado_router.get('/gradoFilter', validarAdminAndProfe, grado_controller.listarGradoByNumero);
// grado_router.post('/subirFotoGrado/:grado_id', grado_controller.subirFotoById);

module.exports = grado_router;