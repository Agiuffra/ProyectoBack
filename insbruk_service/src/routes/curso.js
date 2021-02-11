const { Router } = require('express');
const curso_controller = require('../controllers/curso');
const { validarAdminAndProfe, wachiman } = require('../utils/Validador');
const curso_router = Router();

curso_router.post('/curso', validarAdminAndProfe, curso_controller.crearCurso);
curso_router.get('/curso', wachiman, curso_controller.listarCursos);
curso_router.get('/cursoFilter/:nombre', wachiman, curso_controller.listarCursoByName);

module.exports = curso_router;