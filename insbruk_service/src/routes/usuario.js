const { Router } = require('express');
const usuario_controller = require('../controllers/usuario');
const { wachiman } = require("../utils/Validador");
const usuario_router = Router();

usuario_router.post('/registrar', usuario_controller.registrarUsuario);
usuario_router.post('/login', usuario_controller.loginUsuario);
usuario_router.get('/usuario/:usuario_id', usuario_controller.mostrarUsuario);
usuario_router.put('/editarUsuario', usuario_controller.editarUsuario);
usuario_router.delete('/eliminarUsuario', usuario_controller.eliminarUsuario);
usuario_router.post('/matricular', usuario_controller.matricularUsuario);

module.exports = usuario_router;