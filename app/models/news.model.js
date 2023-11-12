const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
  // Es un campo obligatorio y su valor es el ID de un documento de la colección Users
  autor_noticia: {
    type: mongoose.Schema.Types.ObjectId, // Este es el tipo de dato de los IDs en MongoDB
    ref: "Users", // Este es el nombre de la colección a la que está relacionada la noticia
    required: true, // Este campo es obligatorio
  },

  // El título de la noticia. Es requerido y debe ser un string
  titulo_noticia: { type: String, required: true },

  // El contenido de la noticia. Es requerido y debe ser un string
  contenido_noticia: { type: String, required: true },

  // La categoría de la noticia, que está relacionada con un videojuego.
  // Es un campo obligatorio y su valor es el ID de un documento de la colección Videogames
  videojuego_noticia: {
    type: mongoose.Schema.Types.ObjectId, // Este es el tipo de dato de los IDs en MongoDB
    ref: "Videogames", // Este es el nombre de la colección a la que está relacionada la noticia
    required: true, // Este campo es obligatorio
  },

  // La fecha de creación de la noticia. Si no se proporciona una fecha, se usará la fecha actual
  fecha_noticia: { type: Date, default: Date.now },

  // Estadísticas de la noticia
  likes_noticia: { type: Number, default: 0 },
  dislikes_noticia: { type: Number, default: 0 },

  //Estatus de la noticia
  isactive_noticia: { type: Boolean, default: true },
});

// Exportamos el modelo que definimos
const model = mongoose.model("News", NewsSchema);
module.exports = model;
