const { Curso } = require('../config/sequelize');
const { Op } = require('sequelize');

const crearCurso = (req, res) => {
    Curso.create(req.body).then((cursoCreado) => {
        return res.status(201).json({
            ok: true,
            message: "se ha creado un nuevo curso",
            content: cursoCreado
        });
    }).catch((error) => {
        return res.status(500).json({
            ok: false,
            message: "ha ocurrido un error al crear el curso",
            content: error
        });
    });
}
const listarCursos = (req, res) => {
    Curso.findAll().then((cursosEncontrados) => {
        return res.json({
            ok: true,
            message: "imprimiento los cursos encontrados",
            content: cursosEncontrados
        });
    }).catch((error) => {
        return res.status(500).json({
            ok: false,
            message: "ha ocurrido un error al buscar los cursos",
            content: error
        });
    });
}
const listarCursoByName = (req, res) => {
    let { nombre } = req.params;
    Curso.findAll({
        where: {
            curso_nombre: {
                [Op.substring]: nombre
            }
        }
    }).then((cursosEncontrados) => {
        return res.json({
            ok: true,
            message: "imprimiendo los cursos encontrados",
            content: cursosEncontrados
        });
    }).catch((error) => {
        return res.status(500).json({
            ok: false,
            message: "hubo un error al buscar los cursos",
            content: error
        });
    });
}

module.exports = {
    crearCurso,
    listarCursos,
    listarCursoByName,
}