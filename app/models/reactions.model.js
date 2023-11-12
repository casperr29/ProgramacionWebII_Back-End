const mongoose = require("mongoose");
const { Utilities } = require("../services/utils.service");

const Schema = mongoose.Schema;

//MODELO DE REACCIÓN

const reactionSchema = new Schema({
  idu_reaccion: {
    type: mongoose.Schema.Types.ObjectId, // Este es el tipo de dato de los IDs en MongoDB
    ref: "Users", // Este es el nombre de la colección a la que está relacionada el comentario
    required: true, // Este campo es obligatorio
  },
  idn_reaccion: {
    type: mongoose.Schema.Types.ObjectId, // Este es el tipo de dato de los IDs en MongoDB
    ref: "News", // Este es el nombre de la colección a la que está relacionada el comentario
    required: true, // Este campo es obligatorio
  },
  liked: { type: Number, default: 0 },
});

const model = mongoose.model("Reactions", reactionSchema);
module.exports = model;
