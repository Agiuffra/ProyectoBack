const { Router } = require('express');
const grado_controller = require('../controllers/grado');
const { wachiman, validarAdminAndProfe, validarAdmin } = require('../utils/Validador');
const grado_router = Router();

grado_router.post('/grado', validarAdminAndProfe, grado_controller.crearGrado);
grado_router.get('/grado', validarAdminAndProfe, grado_controller.listarGrados);
grado_router.get('/gradoFilter', validarAdminAndProfe, grado_controller.listarGradoById);
grado_router.put('/actualizarGrado/:id', validarAdmin, grado_controller.editarGradoById);

module.exports = grado_router;