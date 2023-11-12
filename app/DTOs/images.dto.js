const Joi = require("joi");
const { Utilities } = require("../services/utils.service");
require("dotenv").config();

const uuidImage = Joi.string().pattern(
  Utilities.REGEX_VALD_OBJECT_ID.pattern,
  Utilities.REGEX_VALD_OBJECT_ID.name
);

const active = Joi.boolean();

const updateImageDto = Joi.object({
  isactive_imagen: active,
});

const getImageDto = Joi.object({
  idImage: uuidImage.required(),
});

module.exports = {
  updateImageDto,
  getImageDto,
};
