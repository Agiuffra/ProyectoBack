const { Router } = require('express');
const curso_controller = require('../controllers/curso');
const curso_router = Router();

curso_router.post('/curso', curso_controller.crearCurso);
curso_router.get('/curso', curso_controller.listarCursos);
curso_router.get('/cursoId/:curso_id', curso_controller.listarCursoById);

module.exports = curso_router;