const mongoose = require("mongoose");
const { Utilities } = require("../services/utils.service");

const Schema = mongoose.Schema;

const imageSchema = new Schema({
  idn_imagen: {
    type: mongoose.Schema.Types.ObjectId, // Este es el tipo de dato de los IDs en MongoDB
    ref: "News", // Este es el nombre de la colección a la que está relacionada la imagen
    required: true, // Este campo es obligatorio
  },
  contenido_imagen: { type: String },
  fecha_imagen: { type: Date, default: new Date() },
  isactive_imagen: { type: Boolean, default: true },
});

const model = mongoose.model("Images", imageSchema);
module.exports = model;
