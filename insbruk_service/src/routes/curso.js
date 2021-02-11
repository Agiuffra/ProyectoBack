const { Router } = require('express');
const curso_controller = require('../controllers/curso');
const curso_router = Router();

curso_router.post('/curso', curso_controller.crearCurso);
curso_router.get('/curso', curso_controller.listarCursos);
curso_router.get('/cursoFilter/:nombre', curso_controller.listarCursoByName);

module.exports = curso_router;