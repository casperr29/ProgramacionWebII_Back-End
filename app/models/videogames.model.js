const mongoose = require("mongoose");
const { Utilities } = require("../services/utils.service");

const Schema = mongoose.Schema;

//MODELO DE USUARIO

const videogameSchema = new Schema({
  nombre_videojuego: {
    type: String,
    unique: true,
  },
  imagen_videojuego: {
    type: Object,
    default: {
      file_name: "default-videogame-image.png",
      path: "D:\\RESPALDO\\ESCUELA\\PW2\\PIA\\Bisonet\\BackEnd\\app\\storage\\default-profile-image.png",
    },
  },
  descripcion_videojuego: {
    type: String,
  },
  isactive_videojuego: { type: Boolean, default: true },
});

const model = mongoose.model("Videogames", videogameSchema);
module.exports = model;
