const NewsModel = require("../models/news.model");
const NewsDto = require("../DTOs/news.dto");

class NewsService {
  // Método para crear una nueva noticia
  async createNews(
    autor_noticia,
    titulo_noticia,
    contenido_noticia,
    videojuego_noticia
  ) {
    const news = new NewsModel({
      autor_noticia,
      titulo_noticia,
      contenido_noticia,
      videojuego_noticia,
    });
    await news.save();
    return new NewsDto(news);
  }

  // Método para obtener una noticia por su ID
  async getNewsById(id) {
    const news = await NewsModel.findById(id);
    if (!news) throw new Error("Noticia no encontrada");
    return new NewsDto(news);
  }

  // Método para obtener todas las noticias
  async getAllNews() {
    const news = await NewsModel.find();
    return news.map((n) => new NewsDto(n));
  }

  // Método para actualizar una noticia
  async updateNews(id, titulo_noticia, contenido_noticia, videojuego_noticia) {
    const news = await NewsModel.findByIdAndUpdate(
      id,
      { titulo_noticia, contenido_noticia, videojuego_noticia },
      { new: true }
    );
    if (!news) throw new Error("Noticia no encontrada");
    return new NewsDto(news);
  }

  // Método para eliminar una noticia
  async deleteNews(id) {
    const news = await NewsModel.findByIdAndDelete(id);
    if (!news) throw new Error("Noticia no encontrada");
    return new NewsDto(news);
  }

  // Método estático para obtener todas las noticias de un juego específico
  async getNewsByGame(gameId) {
    try {
      const news = await NewsModel.find({
        videojuego_noticia: gameId,
      });
      return news.map((n) => new NewsDto(n));
    } catch (err) {
      throw new Error("Error al obtener noticias por juego: " + err.message);
    }
  }

  // Método estático para obtener todas las noticias creadas por un usuario específico
  async getNewsByUser(userId) {
    try {
      const news = await NewsModel.find({ autor_noticia: userId });
      return news.map((n) => new NewsDto(n));
    } catch (err) {
      throw new Error("Error al obtener noticias por usuario: " + err.message);
    }
  }

  // Método estático para obtener una noticia con su juego asociado e imagen
  async getNewsGameImage(newsId) {
    try {
      const news = await NewsModel.findById(newsId).populate(
        "videojuego_noticia"
      );
      return new NewsDto(news);
    } catch (err) {
      throw new Error(
        "Error al obtener noticia, juego e imagen: " + err.message
      );
    }
  }
}

/*Los métodos marcados como static se pueden llamar directamente en la clase sin necesidad de crear una instancia de NewsService. Esto es útil cuando se necesita acceder a estos métodos desde otros lugares sin tener que instanciar la clase cada vez */

module.exports = new NewsService();
