const Joi = require('joi');
const { Utilities } = require('../services/utils.service');
require('dotenv').config();

//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const objectId = Joi.string().pattern(
  Utilities.REGEX_VALD_OBJECT_ID.pattern,
  Utilities.REGEX_VALD_OBJECT_ID.name
);

const nombre_videojuego = Joi.string();

const imagen_videojuego = Joi.string();

const descripcion_videojuego = Joi.string();

const isactive_videojuego = Joi.boolean();

const createVideogameDto = Joi.object({
  nombre_videojuego: nombre_videojuego.required(),
  imagen_videojuego: imagen_videojuego,
  descripcion_videojuego: descripcion_videojuego.required(),
});

const updateVideogameDto = Joi.object({
  nombre_videojuego: nombre_videojuego,
  imagen_videojuego: imagen_videojuego,
  descripcion_videojuego: descripcion_videojuego,
  isactive_videojuego: isactive_videojuego,
});

const getVideogameDto = Joi.object({
  videogameId: objectId.required(),
});

module.exports = {
  createVideogameDto,
  updateVideogameDto,
  getVideogameDto,
};
