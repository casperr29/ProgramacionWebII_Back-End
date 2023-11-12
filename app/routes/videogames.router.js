const express = require("express");
const boom = require("@hapi/boom");
const VideogameService = require("../services/videogames.service");
const service = new VideogameService();
const validatorHandler = require("../middlewares/validator.handler");
const {
  createVideogameDto,
  updateVideogameDto,
  getVideogameDto,
} = require("../DTOs/videogames.dto");

const { encrypt, compare } = require("../utils/password.handler");
const checkRolHandler = require("../middlewares/checkRol.handler");
const authHandler = require("../middlewares/auth.handler");
const { uploadMiddleware } = require("../utils/storage.handler");

const router = express.Router();

//RUTAS GENERALES /

//GET ALL VIDEOGAMES
router.get("/", async (req, res, next) => {
  try {
    const { size } = req.query;
    const filter = req.body;
    const videogames = await service.getAll(size || 10, filter);
    res.json({
      success: true,
      message: "Videogames found successfully",
      data: videogames,
    });
  } catch (error) {
    next(error);
  }
});

//REGISTER VIDEOGAME
router.post(
  "/",
  authHandler,
  checkRolHandler(true),
  validatorHandler(createVideogameDto, "body"),
  async (req, res, next) => {
    try {
      const { body } = req;

      const videogame = await service.create(body); //Para updates y creates

      res.json({
        success: true, //Validaciones FrontEnd
        message: "Videogame created successfully", //Mostrar al usuario
        data: videogame, //Desplegar información en algún formato
      });
    } catch (error) {
      next(error);
    }
  }
);

//RUTAS ESPECIFICAS /:videogameId

//GET VIDEOGAME BY ID
router.get(
  "/:videogameId",
  validatorHandler(getVideogameDto, "params"),
  async (req, res, next) => {
    try {
      const { videogameId } = req.params; //Obtener ids
      const videogame = await service.getById(videogameId);
      res.json({
        success: true,
        message: "Videogame found successfully",
        data: videogame,
      });
    } catch (error) {
      next(error);
    }
  }
);

//UPDATE VIDEOGAME IMAGE
router.patch(
  "/update_prof_pic/:videogameId",
  authHandler,
  checkRolHandler(true),
  validatorHandler(getVideogameDto, "params"),
  uploadMiddleware.single("file"),
  async (req, res, next) => {
    try {
      const { videogameId } = req.params; //Obtener ids
      const { body, file } = req;

      const photoBody = {
        ...body,
        file_name: file.filename,
        path: file.path,
      };

      const { old, changed } = await service.updateProfilePic(
        videogameId,
        photoBody
      );
      res.json({
        success: true,
        message: "Videogame image updated successfully",
        Original: old,
        Updated: changed,
      });
    } catch (error) {
      next(error);
    }
  }
);

//PARTIALLY UPDATE VIDEOGAME
router.patch(
  "/:videogameId",
  authHandler,
  checkRolHandler(true),
  validatorHandler(getVideogameDto, "params"),
  validatorHandler(updateVideogameDto, "body"),
  async (req, res, next) => {
    try {
      const { videogameId } = req.params; //Obtener ids
      let { body } = req;

      const { old, changed } = await service.update(videogameId, body);
      res.json({
        success: true,
        message: "Videogame updated successfully",
        Original: old,
        Updated: changed,
      });
    } catch (error) {
      next(error);
    }
  }
);

//DELETE VIDEOGAME
router.delete(
  "/:videogameId",
  authHandler,
  checkRolHandler(true),
  validatorHandler(getVideogameDto, "params"),
  async (req, res, next) => {
    try {
      const { videogameId } = req.params; //Obtener ids
      deletedVideogame = await service.delete(videogameId);
      res.json({
        success: true,
        message: "Videogame eliminated successfully",
        videogame: deletedVideogame,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
