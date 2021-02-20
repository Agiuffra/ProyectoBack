const { Router } = require('express');
const usuario_controller = require('../controllers/usuario');
const multer = require('../utils/Multer');
const { wachiman, validarAdminAndProfe, validarAlumnoAndProfe, validarAdmin, validarProfe, verificarPrimerRegistro } = require("../utils/Validador");
const usuario_router = Router();

usuario_router.post('/registrar', verificarPrimerRegistro, usuario_controller.registrarUsuario);
usuario_router.post('/login', usuario_controller.loginUsuario);
usuario_router.post('/isLogedIn', wachiman, usuario_controller.loginValidator);
usuario_router.get('/usuarios', usuario_controller.mostrarUsuarios);
usuario_router.get('/usuarios/:tipo', usuario_controller.mostrarUsuariosByTipo);
usuario_router.get('/usuarioCorreo/:correo', usuario_controller.mostrarUsuarioByCorreo);
usuario_router.get('/usuariosFilter/:id', usuario_controller.mostrarUsuarioById);
usuario_router.put('/editarUsuario/:id', validarAdmin, usuario_controller.editarUsuarioById);
usuario_router.delete('/eliminarUsuario/:id', validarAdmin, usuario_controller.eliminarUsuarioById);
usuario_router.post('/subirNotas', validarProfe, usuario_controller.subirNotas);
usuario_router.get('/verNotas', validarAlumnoAndProfe, usuario_controller.verNotas);
usuario_router.post('/fotoUsuario/:id', multer.single('imagen'), validarAdmin, usuario_controller.subirFotoUsuario);
usuario_router.put('/editarNota/:id', validarProfe, usuario_controller.editarNota);

module.exports = usuario_router;