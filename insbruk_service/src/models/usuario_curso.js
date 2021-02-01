const { DataTypes, Model } = require("sequelize");
const usuarioCursoModel = (conexion) => {
    const usuario_curso = conexion.define(
        "usuarios_cursos",
        {
            usuario_curso_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey:true
            }
        },
        {
            tableName: "t_usuario_curso",
            timestamps: false
        }
    );
    return usuario_curso;
}

module.exports = usuarioCursoModel;