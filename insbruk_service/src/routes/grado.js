const { Router } = require('express');
const grado_controller = require('../controllers/grado');
const { wachiman, validarAdminAndProfe, validarAdmin, validarProfe, validarAlumno } = require('../utils/Validador');
const grado_router = Router();

grado_router.post('/grado', validarAdminAndProfe, grado_controller.crearGrado);
grado_router.get('/grado', grado_controller.listarGrados);
grado_router.get('/gradoFilter', grado_controller.listarGradoById);
grado_router.put('/actualizarGrado/:id', validarAdmin, grado_controller.editarGradoById);
grado_router.get('/gradoAlumnos/:id', validarProfe, grado_controller.listarGradosConAlumnos);
grado_router.get('/gradoCursos/:id', validarAlumno, grado_controller.listarGradosConCursos);

module.exports = grado_router;