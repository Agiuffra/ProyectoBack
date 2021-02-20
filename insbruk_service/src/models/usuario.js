const { DataTypes } = require("sequelize");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const usuarioModel = (conexion) => {
    const usuario = conexion.define(
        "usuarios",
        {
            usuario_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            usuario_nombre: {
                type: DataTypes.STRING(45),
                allowNull: false
            },
            usuario_apep: {
                type: DataTypes.STRING(45),
                allowNull: false
            },
            usuario_apem: {
                type: DataTypes.STRING(45),
                allowNull: false
            },
            usuario_email: {
                type: DataTypes.STRING(45),
                allowNull: false,
                unique: true
            },
            usuario_fechnac: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            usuario_sexo: {
                type: DataTypes.STRING(10),
                allowNull: false
            },
            usuario_dni: {
                type: DataTypes.STRING(8),
                allowNull: false
            },
            usuario_telefono: {
                type: DataTypes.STRING(9),
                allowNull: false,
                unique: true,
                validate: {
                    isNumeric: true,
                    min: 900000000,
                    max: 999999999,
                }
            },
            usuario_foto: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            usuario_tipo: {
                type: DataTypes.STRING(10),
                allowNull: false
            },
            usuario_direccion: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            usuario_hash: {
                type: DataTypes.TEXT
            },
            usuario_salt: {
                type: DataTypes.TEXT
            },
            usuario_estado: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            }
        },
        {
            tableName: "t_usuario",
            timestamps: false
        }
    );
    usuario.prototype.setSaltAndHash = function (password) {
        this.usuario_salt = crypto.randomBytes(16).toString("hex");
        this.usuario_hash = crypto.pbkdf2Sync(password, this.usuario_salt, 1000, 64, "sha512").toString("hex");
    };
    usuario.prototype.generarJWT = function () {
        let payload = {
            id: this.usuario_id,
            email: this.usuario_email,
            tipo: this.usuario_tipo
        }

        let password = process.env.JWT_SECRET || "INSBRUKCP";

        let token = jwt.sign(
            payload,
            password,
            { expiresIn: "7d" },
            { algorithm: "RS256" }
        );

        return token;
    };
    usuario.prototype.validarPassword = function (password) {
        let hashTemporal = crypto.pbkdf2Sync(password, this.usuario_salt, 1000, 64, "sha512").toString('hex');
        return hashTemporal === this.usuario_hash ? true : false;
    };

    return usuario;
}

module.exports = usuarioModel;