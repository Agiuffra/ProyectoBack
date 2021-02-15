const { Router } = require('express');
const usuario_controller = require('../controllers/usuario');
const multer = require ('../utils/Multer');
const { wachiman, validarAdminAndProfe, validarAdmin, validarProfe } = require("../utils/Validador");
const usuario_router = Router();

usuario_router.post('/registrar', usuario_controller.registrarUsuario);
usuario_router.post('/login', usuario_controller.loginUsuario);
usuario_router.get('/usuarios', usuario_controller.mostrarUsuarios);
usuario_router.get('/usuariosFilter/:id', usuario_controller.mostrarUsuarioById);
usuario_router.put('/editarUsuario/:id', validarAdmin, usuario_controller.editarUsuarioById);
usuario_router.delete('/eliminarUsuario/:id', validarAdmin, usuario_controller.eliminarUsuarioById);
usuario_router.post('/subirNotas', validarProfe, usuario_controller.subirNotas);
usuario_router.get('/verNotas', validarAdminAndProfe, usuario_controller.verNotas);
usuario_router.post('/fotoUsuario/:id', multer.single('imagen'), validarAdmin, usuario_controller.subirFotoUsuario);

module.exports = usuario_router;