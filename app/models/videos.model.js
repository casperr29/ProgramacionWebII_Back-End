const mongoose = require("mongoose");
const { Utilities } = require("../services/utils.service");

const Schema = mongoose.Schema;

//MODELO DE VIDEOS DE POST

const videoSchema = new Schema({
  idn_video: {
    type: mongoose.Schema.Types.ObjectId, // Este es el tipo de dato de los IDs en MongoDB
    ref: "News", // Este es el nombre de la colección a la que está relacionada el video
    required: true, // Este campo es obligatorio
  },
  contenido_video: { type: String },
  fecha_video: { type: Date, default: new Date() },
  isactive_video: { type: Boolean, default: true },
});

const model = mongoose.model("Videos", videoSchema);
module.exports = model;
