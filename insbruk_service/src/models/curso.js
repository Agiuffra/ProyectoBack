const { DataTypes } = require("sequelize");
const cursoModel = (conexion) => {
    const curso = conexion.define(
        "cursos",
        {
            curso_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey:true
            },
            curso_nombre: {
                type: DataTypes.STRING(45),
                allowNull: false
            },
            curso_descripcion: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            curso_aforo: {
                type: DataTypes.NUMBER,
                allowNull: false
            }
        },
        {
            tableName: "t_curso",
            timestamps: false
        }
    );
    return curso;
}

module.exports = cursoModel;