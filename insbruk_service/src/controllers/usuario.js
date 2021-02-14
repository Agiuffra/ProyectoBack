const { Usuario, Notas, Curso } = require('../config/sequelize');
const { subirArchivo, eliminarArchivoFirebase } = require('../utils/Firebase');
const { Op } = require('sequelize');

const registrarUsuario = async (req, res) => {
    try {
        let nuevoUser = Usuario.build(req.body);
        nuevoUser.setSaltAndHash(req.body.password);
        await nuevoUser.save();
        let token = nuevoUser.generarJWT();
        return res.status(201).json({
            ok: true,
            message: "usuario creado correctamente",
            content: token
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "hubo un error al crear el usuario",
            content: error
        });
    }
}
const loginUsuario = async (req, res) => {
    try {
        let { correo, password } = req.body;
        let usuarioEncontrado = await Usuario.findOne({
            where: {
                usuario_email: correo
            }
        });
        if (usuarioEncontrado) {
            let validar = usuarioEncontrado.validarPassword(password);
            if (validar) {
                return res.json({
                    ok: true,
                    message: "logeado correctamente",
                    content: usuarioEncontrado.generarJWT()
                });
            }
        }
        return res.status(400).json({
            ok: false,
            message: "Correo o contraseña incorrecto"
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "hubo un error al logearse",
            content: error
        });
    }
}
const mostrarUsuarios = async (req, res) => {
    try {
        let usuariosEncontrados = await Usuario.findAll();
        return res.json({
            ok: true,
            message: "imprimiendo usuarios",
            content: usuariosEncontrados
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "ha ocurrido un error al buscar los usuarios",
            content: error
        });
    }
}
const mostrarUsuariosByName = async (req, res) => {
    try {
        let { nombre } = req.params;
        let usuariosEncontrados = await Usuario.findAll({
            where: {
                usuario_nombre: {
                    [Op.substring]: nombre
                }
            }
        });
        return res.json({
            ok: true,
            message: "imprimiendo usuarios encontrados",
            content: usuariosEncontrados
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "ha ocurrido un error al buscar los usuarios",
            content: error
        });
    }
}
const editarUsuarioByName = async (req, res) => {
    let { nombre, apellido } = req.query;
    try {
        let usuarioEncontrado = await Usuario.findOne({
            where: {
                usuario_nombre: nombre,
                usuario_apep: apellido
            }
        });
        if (usuarioEncontrado) {
            await usuarioEncontrado.update(req.body, {
                where: {
                    usuario_nombre: nombre
                }
            });
            let usuarioActualizado = await Usuario.findOne({
                where: {
                    usuario_nombre: nombre
                }
            });
            return res.status(201).json({
                ok: true,
                message: "usuario actualizado con éxito",
                content: usuarioActualizado
            });
        } else {
            return res.status(404).json({
                ok: false,
                message: "usuario no encontrado",
                content: null
            });
        }
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "hubo un error al actualizar el usuario",
            content: error
        });
    }
}
const eliminarUsuarioByName = async (req, res) => {
    let { nombre, apellido } = req.query;
    try {
        let usuarioEliminado = await Usuario.destroy({
            where: {
                usuario_nombre: nombre,
                usuario_apep: apellido
            }
        });
        if (usuarioEliminado != 0) {
            return res.json({
                ok: true,
                message: 'se eliminió el usuario exitosamente',
                content: usuarioEliminado
            });
        }
        return res.status(404).json({
            ok: false,
            message: "no se ha encontrado al usuario",
            content: null
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            content: error,
            message: 'hubo un error al eliminar el usuario'
        });
    }
}
const subirNotas = async (req, res) => {
    const { nombre, apellido, curso, nota } = req.query;
    let alumnoEncontrado = await Usuario.findOne({
        where: {
            usuario_nombre: nombre,
            usuario_apep: apellido
        }
    });
    // console.log(alumnoEncontrado);
    if (!alumnoEncontrado || alumnoEncontrado.usuario_tipo != "alumno") {
        return res.json({
            ok: false,
            message: "el usuario no existe o no es alumno"
        });
    }
    let cursoEncontrado = await Curso.findOne({
        where: {
            curso_nombre: curso
        }
    });
    if (!cursoEncontrado) {
        return res.json({
            ok: false,
            message: "el curso no existe"
        });
    }
    // crear otra relación entre usuario y notas
    let objNota = {
        notas_califiacion: nota,
        notas_profesor: req.profesor,
        curso_id: cursoEncontrado.curso_id,
        usuario_id: alumnoEncontrado.usuario_id
    }
    let notaNueva = await Notas.create(objNota);
    return res.json({
        ok: true,
        message: "se ha subido una nota correctamente",
        content: notaNueva
    });
}
const verNotas = async (req, res) => {
    let notasAlumno = {}
    const { nombre, apellido, curso } = req.query;
    if (nombre && apellido) {
        let alumnoEncontrado = await Usuario.findOne({
            where: {
                usuario_nombre: nombre,
                usuario_apep: apellido
            }
        });
        if (!alumnoEncontrado || alumnoEncontrado.usuario_tipo != "alumno") {
            return res.json({
                ok: false,
                message: "el usuario no existe o no es alumno"
            });
        }
        if (!curso) {
            notasAlumno = await Notas.findAll({
                where: {
                    usuario_id: alumnoEncontrado.usuario_id
                }
            });
        } else {
            let cursoEncontrado = await Curso.findOne({
                where: {
                    curso_nombre: curso
                }
            });
            if (!cursoEncontrado) {
                return res.json({
                    ok: false,
                    message: "el curso no existe"
                });
            }
            notasAlumno = await Notas.findOne({
                where: {
                    usuario_id: alumnoEncontrado.usuario_id,
                    curso_id: cursoEncontrado.curso_id
                }
            });
        }
        return res.json({
            ok: true,
            message: "imprimiendo notas",
            content: notasAlumno
        });
    } else {
        return res.json({
            ok: false,
            message: "ingrese un alumno"
        });
    }

}
const subirFotoUsuario = async (req, res) => {
    try {
        let { nombre, apellido } = req.query;
        let usuarioEncontrado = await Usuario.findOne({
            where: {
                usuario_nombre: nombre,
                usuario_apep: apellido
            }
        });
        if (usuarioEncontrado) {
            let subida = await subirArchivo(req.file);
            await usuarioEncontrado.update({
                usuario_foto: subida[0]
            }, {
                where: {
                    usuario_nombre: nombre,
                    usuario_apep: apellido
                }
            });
            let usuarioActualizado = await Usuario.findOne({
                where: {
                    usuario_nombre: nombre,
                    usuario_apep: apellido
                }
            });
            return res.status(201).json({
                ok: true,
                message: "se subió la foto del usuario con éxito",
                content: usuarioActualizado
            });
        }
        return res.status(404).json({
            ok: false,
            message: "usuario no encontrado",
            content: null
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "ha ocurrido un error al actualizar la imagen",
            content: error
        });
    }
}

module.exports = {
    registrarUsuario,
    loginUsuario,
    mostrarUsuarios,
    mostrarUsuariosByName,
    editarUsuarioByName,
    eliminarUsuarioByName,
    subirNotas,
    verNotas,
    subirFotoUsuario,
}