const boom = require('@hapi/boom');
const { verifyToken } = require('../utils/jwt.handler');
const UserService = require('../services/users.service');
const userService = new UserService();

const authHandler = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw boom.unauthorized('No se encontro token');
    }
    const token = req.headers.authorization.split(' ').pop();
    const dataToken = await verifyToken(token);
    if (!dataToken) {
      throw boom.unauthorized('Error en el id del token');
    }
    const user = await userService.getById(dataToken._id);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authHandler;
