const { Router } = require('express');
const curso_controller = require('../controllers/curso');
const { validarAdminAndProfe, wachiman, validarAdmin, validarProfe } = require('../utils/Validador');
const curso_router = Router();

curso_router.post('/curso', validarAdminAndProfe, curso_controller.crearCurso);
curso_router.get('/curso', curso_controller.listarCursos);
curso_router.get('/cursoProfesor/:id', validarProfe, curso_controller.listarCursosByUsuarioId);
curso_router.get('/cursoFilter/:id', curso_controller.listarCursoById);
curso_router.put('/actualizarCurso/:id', validarAdmin, curso_controller.editarCursoById);

module.exports = curso_router;