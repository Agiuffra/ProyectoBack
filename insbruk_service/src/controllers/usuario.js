const { Usuario, UsuarioCurso, Curso } = require('../config/sequelize');
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
const matricularUsuario = async (req, res) => {
    let { nombre, apellido, curso } = req.query;
    try {
        let usuarioMatricula = await Usuario.findOne({
            where: {
                usuario_nombre: nombre,
                usuario_apep: apellido
            }
        });
        if (usuarioMatricula) {
            let cursoMatricula = await Curso.findOne({
                where: {
                    curso_nombre : {
                        [Op.substring]: curso
                    }
                }
            });
            if (cursoMatricula) {
                let matriculaCreada = await UsuarioCurso.create({
                    curso_id: cursoMatricula.curso_id,
                    usuario_id: usuarioMatricula.usuario_id
                })
                return res.status(201).json({
                    ok: true,
                    message: "el usuario se ha matriculado en el curso",
                    content: matriculaCreada
                });
            }
            return res.status(404).json({
                ok: false,
                message: "el curso no existe",
                content: null
            });
        }
        return res.status(404).json({
            ok: false,
            message: "el usuario no existe",
            content: null
        });
    } catch (error) {
        return res.status(500)
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
            },{
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
    matricularUsuario,
    subirFotoUsuario,
}