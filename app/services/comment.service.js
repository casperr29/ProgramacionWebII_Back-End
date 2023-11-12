const CommetsModel = require("../models/comments.model");
const CommentDto = require("../DTOs/comments.dto");

class CommentService {
  // Método para crear un nuevo comentario
  async createComment(contenido_comentario, idu_comentario, idn_comentario) {
    const comment = new CommetsModel({
      contenido_comentario,
      idu_comentario,
      idn_comentario,
    });
    await comment.save();
    return new CommentDto(comment);
  }

  // Método para obtener un comentario por su ID
  async getCommentById(id) {
    const comment = await CommetsModel.findById(id)
      .populate("idu_comentario")
      .populate("idn_comentario");
    if (!comment) throw new Error("Comentario no encontrado");
    return new CommentDto(comment);
  }

  // Método para obtener todos los comentarios
  async getAllComments() {
    const comments = await CommetsModel.find()
      .populate("idu_comentario")
      .populate("idn_comentario");
    return comments.map((c) => new CommentDto(c));
  }

  // Método para actualizar un comentario
  async updateComment(id, contenido_comentario) {
    const comment = await CommetsModel.findByIdAndUpdate(
      id,
      { contenido_comentario },
      { new: true }
    );
    if (!comment) throw new Error("Comentario no encontrado");
    return new CommentDto(comment);
  }

  // Método para eliminar un comentario
  async deleteComment(id) {
    const comment = await CommetsModel.findByIdAndDelete(id);
    if (!comment) throw new Error("Comentario no encontrado");
    return new CommentDto(comment);
  }

  // Método para obtener todos los comentarios reportados por un usuario específico
  async getCommentsByReportedUser(userId) {
    const comments = await CommetsModel.find({ reportedUser: userId }).populate(
      "reportedUser"
    );
    return comments.map((c) => new CommentDto(c));
  }
}

module.exports = new CommentService();
