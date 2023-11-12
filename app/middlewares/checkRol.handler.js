const boom = require("@hapi/boom");

const checkRolHandler = (rol) => (req, res, next) => {
  try {
    const { user } = req;
    const rolesBy = user.tipo_usuario;
    if (!(rolesBy === true || (rol === false && rolesBy === false))) {
      throw boom.unauthorized("El usuario no tiene permisos suficientes");
    }
    next();
  } catch (error) {
    res.status(403).send({
      success: false,
      data: [],
      stack: error,
      message: "Error en la consulta de permisos",
    });
  }
};

module.exports = checkRolHandler;
