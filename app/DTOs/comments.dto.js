// Definimos la clase CommentDto para representar la estructura de datos de un comentario en un formato más adecuado para la respuesta
class CommentDto {
  constructor(comment) {
    // En el constructor, recibimos el objeto del comentario como parámetro
    // y asignamos sus propiedades a las propiedades de la instancia de CommentDto

    // ID del comentario
    this.id = comment._id;

    // Contenido del comentario
    this.contenido_comentario = comment.contenido_comentario;

    // Autor del comentario. Aquí asumimos que el modelo de Comment tiene una referencia a la colección User
    // por lo que la propiedad author sería el ID de un documento de la colección User
    this.idu_comentario = comment.idu_comentario;

    // Noticia a la que pertenece el comentario. Aquí asumimos que el modelo de Comment tiene una referencia a la colección News
    // por lo que la propiedad news sería el ID de un documento de la colección News
    this.idn_comentario = comment.idn_comentario;

    // Fecha de creación del comentario
    this.fecha_comentario = comment.fecha_comentario;

    // Estado de reporte del comentario
    this.reported = comment.reported;
    // Id del usuario que reporto el comentario
    this.reportedUser = comment.reportedUser;

    // Estatus del comentario
    this.isactive_comentario = comment.isactive_comentario;
  }
}

// Exportamos la clase CommentDto para poder utilizarla en otros archivos
module.exports = CommentDto;
