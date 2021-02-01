const { DataTypes } = require("sequelize");
const gradoModel = (conexion) => {
    const grado = conexion.define(
        "grados",
        {
            grado_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey:true
            },
            grado_nivel: {
                type: DataTypes.STRING(10),
                allowNull: false
            },
            grado_numero: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            tableName: "t_grado",
            timestamps: false
        }
    );
    return grado;
}

module.exports = gradoModel;