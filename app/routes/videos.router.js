const express = require("express");
const VideosService = require("../services/videos.service");
const service = new VideosService();

const { updateVideoDto, getVideoDto } = require("../DTOs/videos.dto");

const checkRolHandler = require("../middlewares/checkRol.handler");
const validatorHandler = require("../middlewares/validator.handler");
const authHandler = require("../middlewares/auth.handler");
const { uploadMiddleware } = require("../utils/storage.handler");

const router = express.Router();

const { PUBLIC_URL } = require("../../const.json");

//GET ALL VIDEOS
router.get("/", async (req, res, next) => {
  try {
    const { size } = req.query;
    const filter = req.body;
    const videos = await service.getAll(size || 10, filter);
    res.json({
      success: true,
      message: "videos found successfully",
      data: videos,
    });
  } catch (error) {
    next(error);
  }
});

//GET ALL VIDEOS FROM NEWS
router.get("/news/:idNews", async (req, res, next) => {
  try {
    const { size } = req.query;
    const { idNews } = req.params;
    const videos = await service.getAll(size || 10, { idn_video: idNews });
    res.json({
      success: true,
      message: "videos found successfully",
      data: videos,
    });
  } catch (error) {
    next(error);
  }
});

//GET VIDEO BY ID
router.get(
  "/:idVideo",
  validatorHandler(getVideoDto, "params"),
  async (req, res, next) => {
    try {
      const { idVideo } = req.params; //Obtener ids
      const videos = await service.getById(idVideo);
      res.json({
        success: true,
        message: "video found successfully",
        url: `${PUBLIC_URL}/${videos.file_name}`,
        data: videos,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/:newsId",
  authHandler,
  checkRolHandler(false),
  uploadMiddleware.single("file"),
  async (req, res, next) => {
    try {
      const { body, file } = req;
      const { newsId } = req.params;

      const videoBody = {
        ...body,
        idn_video: newsId,
        contenido_video: file.path,
      };

      const videos = await service.create(videoBody); //Para updates y creates
      const fileData = {
        contenido_video: file.filename,
        url: `${PUBLIC_URL}/${file.filename}`,
        data: videos,
      };

      res.json({
        success: true, //Validaciones FrontEnd
        message: `Video created successfully - ${file["filename"]}`, //Mostrar al usuario
        data: fileData, //Desplegar información en algún formato
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/update/videos/:idVideo",
  authHandler,
  checkRolHandler(1),
  validatorHandler(getVideoDto, "params"),
  validatorHandler(updateVideoDto, "body"),
  async (req, res, next) => {
    try {
      const { idVideo } = req.params; //Obtener ids
      const body = req.body;
      const { old, changed } = await service.update(idVideo, body);
      res.json({
        success: true,
        message: "Video updated successfully",
        url: `${PUBLIC_URL}/${changed.file_name}`,
        Original: old,
        Updated: changed,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:idVideo",
  authHandler,
  checkRolHandler(false),
  validatorHandler(getVideoDto, "params"),
  async (req, res, next) => {
    try {
      const { idVideo } = req.params; //Obtener ids
      videos = await service.delete(idVideo);
      res.json({
        success: true,
        message: "Video eliminated successfully",
        video: videos,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
