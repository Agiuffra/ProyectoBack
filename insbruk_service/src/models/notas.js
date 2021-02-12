const { DataTypes, Model } = require("sequelize");
const notasModel = (conexion) => {
    const notas = conexion.define(
        "notas",
        {
            notas_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey:true
            },
            notas_califiacion: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            notas_profesor: {
                type: DataTypes.STRING(20),
                allowNull: false
            }
        },
        {
            tableName: "t_notas",
            timestamps: false
        }
    );
    return notas;
}

module.exports = notasModel;