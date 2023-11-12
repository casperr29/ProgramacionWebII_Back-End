const mongoose = require("mongoose");
const { Schema } = mongoose;

const CommentSchema = new Schema({
  // El contenido del comentario. Es requerido y debe ser un string
  contenido_comentario: { type: String, required: true },

  // El autor del comentario, referenciando al usuario que hizo el comentario
  // Es un campo obligatorio y su valor es el ID de un documento de la colección User
  idu_comentario: { type: Schema.Types.ObjectId, ref: "Users", required: true },

  // La noticia a la que pertenece el comentario
  // Es un campo obligatorio y su valor es el ID de un documento de la colección News
  idn_comentario: { type: Schema.Types.ObjectId, ref: "News", required: true },

  // La fecha de creación del comentario. Si no se proporciona una fecha, se usará la fecha actual
  fecha_comentario: { type: Date, default: Date.now },

  // Campo para indicar si el comentario ha sido reportado. Por defecto, no está reportado
  reported: { type: Boolean, default: false },

  // El usuario que ha reportado el comentario. No es un campo requerido
  // Cuando se proporciona, su valor es el ID de un documento de la colección User
  reportedUser: { type: Schema.Types.ObjectId, ref: "Users" },

  //Estatus del comentario
  isactive_comentario: { type: Boolean, default: true },
});

// Exportamos el modelo que definimos.

module.exports = mongoose.model("Comments", CommentSchema);
