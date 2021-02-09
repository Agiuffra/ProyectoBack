const jwt = require("jsonwebtoken");
const { Usuario } = require('../config/sequelize');

const verificarToken = (token) => {
  try {
    let password = process.env.JWT_SECRET || "codigo4";
    let resultado = jwt.verify(token, password, { algorithm: "RS256" });
    return resultado;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const wachiman = (req, res, next) => {
  if (req.headers.authorization) {
    let token = req.headers.authorization.split(" ")[1];
    let respuesta = verificarToken(token);
    if (respuesta) {
      req.usuario = respuesta;
      next();
    } else {
      return res.status(401).json({
        ok: false,
        content: "No estas autorizado para realizar esta solicitud",
      });
    }
  } else {
    return res.status(401).json({
      ok: false,
      message: "Necesitas estar autenticado para realizar esta peticion",
    });
  }
};

module.exports = {
  wachiman
};
