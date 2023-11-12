const Joi = require("joi");
const { Utilities } = require("../services/utils.service");
require("dotenv").config();

//SCHEMA PARA DATOS REQUERIDOS Y LOGICA DE NEGOCIO
const objectId = Joi.string().pattern(
  Utilities.REGEX_VALD_OBJECT_ID.pattern,
  Utilities.REGEX_VALD_OBJECT_ID.name
);
const idu_reaccion = Joi.string().pattern(
  Utilities.REGEX_VALD_OBJECT_ID.pattern,
  Utilities.REGEX_VALD_OBJECT_ID.name
);
const idn_reaccion = Joi.string().pattern(
  Utilities.REGEX_VALD_OBJECT_ID.pattern,
  Utilities.REGEX_VALD_OBJECT_ID.name
);
const liked = Joi.number().min(-1).max(1);

const createReactionDto = Joi.object({
  idu_reaccion: idu_reaccion.required(),
  idn_reaccion: idn_reaccion.required(),
  liked: liked.required(),
});

const updateReactionDto = Joi.object({
  liked: liked.required(),
});

const getReactionDto = Joi.object({
  reactionId: objectId.required(),
});

module.exports = {
  createReactionDto,
  updateReactionDto,
  getReactionDto,
};
