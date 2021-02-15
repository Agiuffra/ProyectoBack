const express = require("express");
const bodyParser = require("body-parser");
const { conexion } = require("./sequelize");

// Llamar a los routers
const curso_router = require('../routes/curso');
const grado_router = require('../routes/grado');
const usuario_router = require('../routes/usuario');

module.exports = class Server {
  constructor() {
    this.app = express();
    this.puerto = process.env.PORT || 5000;
    this.CORS();
    this.configurarBodyParser();
    this.rutas();
  }
  CORS() {
    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Header", "Content-Type, Authorization");
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
      next();
    });
  }
  configurarBodyParser() {
    this.app.use(bodyParser.json());
  }
  rutas() {
    this.app.get("/", (req, res) => {
      res.json({
        ok: true,
        message: " Bienvenido al API del aula virtual INSBRUK 😂",
      });
    });
    this.app.use("", curso_router, grado_router, usuario_router);
  }
  start() {
    this.app.listen(this.puerto, () => {
      console.log("Servidor corriendo exitosamente!! 😍");
      conexion.sync({
        force: true,
        alter: true
      }).then(() => {
        console.log('Base de datos sincronizada correctamente');
      }).catch((error) => {
        console.log(error);
      })
    });
  }
};
