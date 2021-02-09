const { DataTypes } = require("sequelize");
const usuarioModel = (conexion) => {
    const usuario = conexion.define(
        "usuarios",
        {
            usuario_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey:true
            },
            usuario_nombre : {
                type: DataTypes.STRING(45),
                allowNull: false
            },
            usuario_apem : {
                type: DataTypes.STRING(45),
                allowNull: false
            },
            usuario_apep : {
                type: DataTypes.STRING(45),
                allowNull: false
            },
            usuario_email : {
                type: DataTypes.STRING(45),
                allowNull: false
            },
            usuario_fechnac : {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            usuario_sexo : {
                type: DataTypes.STRING(10),
                allowNull: false
            },
            usuario_dni : {
                type: DataTypes.STRING(8),
                allowNull: false
            },
            usuario_telefono : {
                type: DataTypes.STRING(9),
                allowNull: false
            },
            usuario_tipo : {
                type: DataTypes.STRING(10),
                allowNull: false
            },
            usuario_direccion : {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            usuario_hash : {
                type: DataTypes.TEXT
            },
            usuario_estado : {
                type: DataTypes.BOOLEAN,
                defaulValue: true
            }
        },
        {
            tableName: "t_usuario",
            timestamps: false
        }
    );
    return usuario;
}

module.exports = usuarioModel;