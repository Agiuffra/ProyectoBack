const { Sequelize } = require("sequelize");

const curso_modelo = require('../models/curso');
const usuario_modelo = require('../models/usuario');
// const direccion_modelo = require('../models/direccion');
const grado_modelo = require('../models/grado');
const usuario_curso_modelo = require('../models/usuario_curso');

const conexion = new Sequelize("insbruk", "root", "Ut3c7599", {
    host: "127.0.0.1",
    dialect: "mysql",
    timezone: "-05:00",
    logging: false,
    dialectOptions: {
        dateStrings: true,
    },
});

const Curso = curso_modelo(conexion);
const Usuario = usuario_modelo(conexion);
// const Direccion = direccion_modelo(conexion);
const Grado = grado_modelo(conexion);
const UsuarioCurso = usuario_curso_modelo(conexion);

Curso.hasMany(UsuarioCurso, { foreignKey: { name: "curso_id", allowNull: false } });
UsuarioCurso.belongsTo(Curso, { foreignKey: "curso_id" });

Usuario.hasMany(UsuarioCurso, { foreignKey: { name: "usuario_id", allowNull: false } });
UsuarioCurso.belongsTo(Usuario, { foreignKey: "usuario_id" });

Grado.hasMany(Curso, { foreignKey: { name: "grado_id", allowNull: false } });
Curso.belongsTo(Grado, { foreignKey: "grado_id" });

Grado.hasMany(Usuario, { foreignKey: { name: "grado_id", allowNull: false } });
Usuario.belongsTo(Grado, { foreignKey: "grado_id" });

// Direccion.hasMany(Usuario, { foreignKey: { name: "direccion_id", allowNull: false } });
// Usuario.belongsTo(Direccion, { foreignKey: "direccion_id" });

module.exports = {
    conexion,
    Curso,
    Usuario,
    // Direccion,
    Grado,
    UsuarioCurso,
};

// NOTA: se eliminó la tabla dirección por separado para facilitar el registro de los usuarios.