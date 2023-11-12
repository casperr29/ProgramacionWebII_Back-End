const Joi = require("joi");
const { Utilities } = require("../services/utils.service");
require("dotenv").config();

//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const objectId = Joi.string().pattern(
  Utilities.REGEX_VALD_OBJECT_ID.pattern,
  Utilities.REGEX_VALD_OBJECT_ID.name
);

const nombre_usuario = Joi.string();

const correo_usuario = Joi.string().pattern(
  Utilities.REGEX_VALD_EMAIL.pattern,
  Utilities.REGEX_VALD_EMAIL.name
);

const password_usuario = Joi.string().pattern(
  Utilities.REGEX_VALD_PASSWORD.pattern,
  Utilities.REGEX_VALD_PASSWORD.name
);

const foto_usuario = Joi.object();

const reporte_usuario = Joi.number().min(0);

const tipo_usuario = Joi.boolean();

const isactive_usuario = Joi.boolean();

const createUserDto = Joi.object({
  password_usuario: password_usuario.required(),
  nombre_usuario: nombre_usuario.required(),
  correo_usuario: correo_usuario.required(),
  foto_usuario: foto_usuario,
  reporte_usuario: reporte_usuario,
  tipo_usuario: tipo_usuario.required(),
});

const updateUserDto = Joi.object({
  password_usuario: password_usuario,
  nombre_usuario: nombre_usuario,
  correo_usuario: correo_usuario,
  foto_usuario: foto_usuario,
  reporte_usuario: reporte_usuario,
  tipo_usuario: tipo_usuario,
  isactive_usuario: isactive_usuario,
});

const getUserDto = Joi.object({
  userId: objectId.required(),
});

const loginDto = Joi.object({
  correo_usuario: correo_usuario.required(),
  password_usuario: Joi.string().required(),
});

module.exports = {
  createUserDto,
  updateUserDto,
  getUserDto,
  loginDto,
};
