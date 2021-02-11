const { Router } = require('express');
const grado_controller = require('../controllers/grado');
const grado_router = Router();
const Multer = require('multer');

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        // bytes*1024=kilobytes*1024=megabytes
        fileSize: 5*1024*1024
    }
});

grado_router.post('/grado', grado_controller.crearGrado);
grado_router.get('/grado', grado_controller.listarGrados);
grado_router.get('/gradoFilter', grado_controller.listarGradoByNumero);
grado_router.post('/subirFotoGrado/:grado_id', multer.single('imagen'), grado_controller.subirFotoById);

module.exports = grado_router;