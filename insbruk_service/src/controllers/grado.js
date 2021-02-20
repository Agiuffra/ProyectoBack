const { Grado, Usuario, Curso, Notas } = require('../config/sequelize');
const { Op } = require('sequelize');

const crearGrado = async (req, res) => { 
    try {
        let newGrado = await Grado.create(req.body);
        return res.status(201).json({
            ok: true,
            message: "se ha creado un nuevo grado",
            content: newGrado
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "ha ocurrido un error al crear grado",
            content: error
        });
    }
}
const listarGrados = async (req, res) => { 
    try {
        let gradosEncontrados = await Grado.findAll();
        return res.json({
            ok: true,
            message: "imprimiento todos los grados",
            content: gradosEncontrados
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "ha ocurrido un error al buscar los grados",
            content: gradosEncontrados
        })
    }
}
const listarGradosConAlumnos = async (req, res) => { 
    try {
        let { id } = req.params;
        let gradosEncontrados = await Grado.findOne({
            where: {
                grado_id: id
            },
            include: {
                model: Usuario,
                include: {
                    model: Notas
                }
            }
        });
        return res.json({
            ok: true,
            message: "imprimiento todos los grados",
            content: gradosEncontrados
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "ha ocurrido un error al buscar los grados",
            content: error
        })
    }
}
const listarGradosConCursos = async (req, res) => {
    try {
        let { id } = req.params;
        let gradosEncontrados = await Grado.findOne({
            where: {
                grado_id: id
            },
            include: {
                model: Curso,
                include: {
                    model: Usuario,
                    attributes: ['usuario_id','usuario_nombre','usuario_apep','usuario_apem']
                }
            }
        });
        return res.json({
            ok: true,
            message: "imprimiento todos los grados",
            content: gradosEncontrados
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "ha ocurrido un error al buscar los grados",
            content: error
        })
    }
}
const listarGradoById = async (req, res) => {
    try {
        let { id } = req.query;
        let gradosEncontrados = await Grado.findAll({
            where: {
                grado_id: id
            }
        });
        return res.json({
            ok: true,
            message: "imprimiendo el grado encontrado",
            content: gradosEncontrados
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "ha ocurrido un error al buscar los grados",
            content: error
        });
    }
}
const editarGradoById = async (req, res) => {
    let { id } = req.params;
    try {
        let gradoEncontrado = await Grado.findByPk(id);
        if (gradoEncontrado) {
            await gradoEncontrado.update(req.body, {
                where: {
                    grado_id: id
                }
            });
            let gradoActualizado = await Grado.findByPk(id);
            return res.status(201).json({
                ok: true,
                message: "grado actualizado",
                content: gradoActualizado
            });
        }
        return res.status(404).json({
            ok: false,
            message: "no se ha encontrado el grado",
            content: null
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "ocurrió un error al editar el grado",
            content: error
        });
    }
}

module.exports = {
    crearGrado,
    listarGrados,
    listarGradoById,
    editarGradoById,
    listarGradosConAlumnos,
    listarGradosConCursos
}