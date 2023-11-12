const Joi = require("joi");
const { Utilities } = require("../services/utils.service");
require("dotenv").config();

const uuidVideo = Joi.string().pattern(
  Utilities.REGEX_VALD_OBJECT_ID.pattern,
  Utilities.REGEX_VALD_OBJECT_ID.name
);

const active = Joi.boolean();

const updateVideoDto = Joi.object({
  isactive_video: active,
});

const getVideoDto = Joi.object({
  idVideo: uuidVideo.required(),
});

module.exports = {
  updateVideoDto,
  getVideoDto,
};
