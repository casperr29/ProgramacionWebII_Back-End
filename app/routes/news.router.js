const express = require("express");
const router = express.Router();
const newsService = require("../services/news.service");

// Ruta para crear una nueva noticia
router.post("/", async (req, res) => {
  try {
    const {
      autor_noticia,
      titulo_noticia,
      contenido_noticia,
      videojuego_noticia,
    } = req.body;
    const newsDto = await newsService.createNews(
      autor_noticia,
      titulo_noticia,
      contenido_noticia,
      videojuego_noticia
    );
    res.status(201).json(newsDto);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ruta para obtener una noticia por su ID
router.get("/:id", async (req, res) => {
  try {
    const newsDto = await newsService.getNewsById(req.params.id);
    res.json(newsDto);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ruta para obtener todas las noticias
router.get("/", async (req, res) => {
  try {
    const news = await newsService.getAllNews();
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ruta para actualizar una noticia por su ID
router.patch("/:id", async (req, res) => {
  try {
    const { titulo_noticia, contenido_noticia, videojuego_noticia } = req.body;
    const newsDto = await newsService.updateNews(
      req.params.id,
      titulo_noticia,
      contenido_noticia,
      videojuego_noticia
    );
    res.json(newsDto);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ruta para eliminar una noticia por su ID
router.delete("/:id", async (req, res) => {
  try {
    const newsDto = await newsService.deleteNews(req.params.id);
    res.json(newsDto);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ruta para obtener todas las noticias relacionadas con un juego específico
router.get("/game/:gameId", async (req, res, next) => {
  try {
    const news = await newsService.getNewsByGame(req.params.gameId);
    res.json(news);
  } catch (e) {
    next(e);
  }
});

// Ruta para obtener todas las noticias creadas por un usuario específico
router.get("/user/:userId", async (req, res, next) => {
  try {
    const news = await newsService.getNewsByUser(req.params.userId);
    res.json(news);
  } catch (e) {
    next(e);
  }
});

// Ruta para obtener todos las noticias de un usuario específico
router.get("/reported/:userId", async (req, res, next) => {
  try {
    const news = await newsService.getNewsByUser(req.params.userId);
    res.json(news);
  } catch (e) {
    next(e);
  }
});

// Ruta para obtener una noticia, con su juego asociado e imagen
router.get("/game/:id/multimedia", async (req, res, next) => {
  try {
    const news = await newsService.getNewsGameImage(req.params.id);
    res.json(news);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
