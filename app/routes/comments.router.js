const express = require("express");
const router = express.Router();
const commentService = require("../services/comment.service");

// Crear un nuevo comentario
router.post("/", async (req, res) => {
  try {
    const { contenido_comentario, idu_comentario, idn_comentario } = req.body;
    const comment = await commentService.createComment(
      contenido_comentario,
      idu_comentario,
      idn_comentario
    );
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtener un comentario por su ID
router.get("/:id", async (req, res) => {
  try {
    const comment = await commentService.getCommentById(req.params.id);
    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtener todos los comentarios
router.get("/", async (req, res) => {
  try {
    const comments = await commentService.getAllComments();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Actualizar un comentario por su ID
router.patch("/:id", async (req, res) => {
  try {
    const { contenido_comentario } = req.body;
    const comment = await commentService.updateComment(
      req.params.id,
      contenido_comentario
    );
    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Eliminar un comentario por su ID
router.delete("/:id", async (req, res) => {
  try {
    const comment = await commentService.deleteComment(req.params.id);
    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// // Obtener todos los comentarios reportados por un usuario específico
// router.get("/reported/:reportedUserId", async (req, res) => {
//   try {
//     const comments = await commentService.getCommentsByReportedUser(
//       req.params.reportedUserId
//     );
//     res.json(comments);
//   } catch (e) {
//     res.status(500).json({ message: e.message });
//   }
// });

module.exports = router;
