const { Router } = require('express');
const curso_controller = require('../controllers/curso');
const { validarAdminAndProfe, wachiman, validarAdmin } = require('../utils/Validador');
const curso_router = Router();

curso_router.post('/curso', validarAdminAndProfe, curso_controller.crearCurso);
curso_router.get('/curso', wachiman, curso_controller.listarCursos);
curso_router.get('/cursoFilter/:id', wachiman, curso_controller.listarCursoById);
curso_router.put('/actualizarCurso/:id', validarAdmin, curso_controller.editarCursoById);

module.exports = curso_router;