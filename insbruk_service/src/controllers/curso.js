const { Curso, Usuario, Grado } = require('../config/sequelize');
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
    Curso.findAll({
        include: [{
            model: Usuario,
            attributes: ['usuario_id','usuario_nombre','usuario_apep','usuario_apem']
        },{
            model: Grado,
            attributes: ['grado_id','grado_nivel','grado_numero']
        }]
    }).then((cursosEncontrados) => {
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
const listarCursosByUsuarioId = (req, res) => {
    let { id } = req.params;
    Curso.findAll({
        where: {
            usuario_id: id
        },include: [{
            model: Usuario,
            attributes: ['usuario_id','usuario_nombre','usuario_apep','usuario_apem']
        },{
            model: Grado,
            attributes: ['grado_id','grado_nivel','grado_numero']
        }]
    }).then((cursosEncontrados) => {
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
const listarCursoById = (req, res) => {
    let { id } = req.params;
    Curso.findOne({
        where: {
            curso_id: id
        },include: [{
            model: Usuario,
            attributes: ['usuario_id','usuario_nombre','usuario_apep','usuario_apem']
        },{
            model: Grado,
            attributes: ['grado_id','grado_nivel','grado_numero']
        }]
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
const editarCursoById = async (req, res) => {
    let { id } = req.params;
    try {
        let cursoEncontrado = await Curso.findByPk(id);
        if (cursoEncontrado) {
            await cursoEncontrado.update(req.body, {
                where: {
                    curso_id: id
                }
            });
            let cursoActualizado = await Curso.findByPk(id);
            return res.status(201).json({
                ok: true,
                message: "curso actualizado",
                content: cursoActualizado
            });
        }
        return res.status(404).json({
            ok: false,
            message: "no se ha encontrado al curso",
            content: null
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "ocurrió un error al editar el curso",
            content: error
        });
    }
}

module.exports = {
    crearCurso,
    listarCursos,
    listarCursosByUsuarioId,
    listarCursoById,
    editarCursoById
}