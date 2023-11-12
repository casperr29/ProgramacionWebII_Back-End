const express = require("express");
const ReactionsService = require("../services/reactions.service");
const service = new ReactionsService();
const validatorHandler = require("../middlewares/validator.handler");
const {
  createReactionDto,
  updateReactionDto,
  getReactionDto,
} = require("../DTOs/reactions.dto");

const checkRolHandler = require("../middlewares/checkRol.handler");
const authHandler = require("../middlewares/auth.handler");
const router = express.Router();

//RUTAS GENERALES /

//GET ALL REACTION
router.get("/", async (req, res, next) => {
  try {
    const { size } = req.query;
    const filter = req.body;
    const reactions = await service.getAll(size || 10, filter);
    res.json({
      success: true,
      message: "Reactions found successfully",
      data: reactions,
    });
  } catch (error) {
    next(error);
  }
});

//CREATE REACTION
router.post(
  "/",
  authHandler,
  checkRolHandler(false),
  validatorHandler(createReactionDto, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const reaction = await service.create(body); //Para updates y creates
      res.json({
        success: true, //Validaciones FrontEnd
        message: "Reaction created successfully", //Mostrar al usuario
        data: reaction, //Desplegar información en algún formato
      });
    } catch (error) {
      next(error);
    }
  }
);

//RUTAS ESPECIFICAS /:id

//GET REACTION BY ID
router.get(
  "/:reactionId",
  validatorHandler(getReactionDto, "params"),
  async (req, res, next) => {
    try {
      const { reactionId } = req.params; //Obtener ids
      const reaction = await service.getById(reactionId);
      res.json({
        success: true,
        message: "Reaction found successfully",
        data: reaction,
      });
    } catch (error) {
      next(error);
    }
  }
);

//PARTIALLY UPDATE REACTION
router.patch(
  "/:reactionId",
  authHandler,
  checkRolHandler(false),
  validatorHandler(getReactionDto, "params"),
  validatorHandler(updateReactionDto, "body"),
  async (req, res, next) => {
    try {
      const { reactionId } = req.params; //Obtener ids
      const body = req.body;
      const { old, changed } = await service.update(reactionId, body);
      res.json({
        success: true,
        message: "Reaction updated successfully",
        Original: old,
        Updated: changed,
      });
    } catch (error) {
      next(error);
    }
  }
);

//DELETE REACTION
router.delete(
  "/:reactionId",
  authHandler,
  checkRolHandler(true),
  validatorHandler(getReactionDto, "params"),
  async (req, res, next) => {
    try {
      const { reactionId } = req.params; //Obtener ids
      deletedReaction = await service.delete(reactionId);
      res.json({
        success: true,
        message: "Reaction eliminated successfully",
        reaction: deletedReaction,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
