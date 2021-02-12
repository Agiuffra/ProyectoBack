const { Grado } = require('../config/sequelize');
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
const listarGradoByNumero = async (req, res) => {
    try {
        let { numero } = req.query;
        let gradosEncontrados = await Grado.findAll({
            where: {
                grado_numero: {
                    [Op.substring]: numero
                }
            }
        });
        return res.json({
            ok: true,
            message: "imprimiendo el/los grado(s) encontrado(s)",
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

module.exports = {
    crearGrado,
    listarGrados,
    listarGradoByNumero
}