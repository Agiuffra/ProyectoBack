const { Sequelize } = require("sequelize");

const curso_modelo = require('../models/curso');
const usuario_modelo = require('../models/usuario');
const grado_modelo = require('../models/grado');
const notas_modelo = require('../models/notas');

const conexion = new Sequelize("na9kkt5s6a4b3xwx", "g6fcf6u46j9q49kv", "m5as8o1qp3pja0at", {
    host: "qz8si2yulh3i7gl3.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    dialect: "mysql",
    timezone: "-05:00",
    logging: false,
    dialectOptions: {
        dateStrings: true,
    },
});

const Curso = curso_modelo(conexion);
const Usuario = usuario_modelo(conexion);
const Grado = grado_modelo(conexion);
const Notas = notas_modelo(conexion);

Curso.hasMany(Notas, { foreignKey: { name: "curso_id", allowNull: false } });
Notas.belongsTo(Curso, { foreignKey: "curso_id" });

Usuario.hasMany(Notas, { foreignKey: "usuario_id" });
Notas.belongsTo(Usuario, { foreignKey: "usuario_id" });

Usuario.hasMany(Curso, { foreignKey: "usuario_id" });
Curso.belongsTo(Usuario, { foreignKey: "usuario_id" });

Grado.hasMany(Curso, { foreignKey: { name: "grado_id", allowNull: false } });
Curso.belongsTo(Grado, { foreignKey: "grado_id" });

Grado.hasMany(Usuario, { foreignKey: { name: "grado_id" } });
Usuario.belongsTo(Grado, { foreignKey: "grado_id" });

module.exports = {
    conexion,
    Curso,
    Usuario,
    Grado,
    Notas
};