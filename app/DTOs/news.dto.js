// Definimos la clase NewsDto para representar la estructura de datos de una noticia en un formato más adecuado para la respuesta
class NewsDto {
  constructor(model) {
    // En el constructor, recibimos el modelo de la noticia como parámetro
    // y asignamos sus propiedades a las propiedades de la instancia de NewsDto

    // ID de la noticia
    this.id = model._id;

    // Autor de la noticia. Aquí asumimos que el modelo de Noticia tiene una referencia a la colección User
    // por lo que la propiedad autor_noticia sería el ID de un documento de la colección User
    this.autor_noticia = model.autor_noticia;

    // Título de la noticia
    this.titulo_noticia = model.titulo_noticia;

    // Contenido de la noticia
    this.contenido_noticia = model.contenido_noticia;

    // Categoría de la noticia. Aquí asumimos que el modelo de News tiene una referencia a la colección VideoGame
    // por lo que la propiedad category sería el ID de un documento de la colección VideoGame
    this.videojuego_noticia = model.videojuego_noticia;

    // Fecha de la noticia
    this.fecha_noticia = model.fecha_noticia;

    // Estadísticas de la noticia
    this.likes_noticia = model.likes_noticia;
    this.dislikes_noticia = model.dislikes_noticia;

    //Estatus de la noticia
    this.isactive_noticia = model.isactive_noticia;
  }
}

module.exports = NewsDto;
