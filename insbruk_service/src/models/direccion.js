const { DataTypes } = require("sequelize");
const direccionModel = (conexion) => {
    const direccion = conexion.define(
        "direcciones",
        {
            direccion_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey:true
            },
            direccion_distrito: {
                type: DataTypes.STRING(45),
                allowNull: false,
            },
            direccion_calle: {
                type: DataTypes.STRING(45),
                allowNull: false,
            },
            direccion_numero: {
                type: DataTypes.NUMBER,
                allowNull: false,
            }
        },
        {   
            tableName: "t_direccion",
            timestamps: false
        }
    );
    return direccion;
}

module.exports = direccionModel;