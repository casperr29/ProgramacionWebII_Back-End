const express = require("express");
const ImagesService = require("../services/images.service");
const service = new ImagesService();

const { updateImageDto, getImageDto } = require("../DTOs/images.dto");

const checkRolHandler = require("../middlewares/checkRol.handler");
const validatorHandler = require("../middlewares/validator.handler");
const authHandler = require("../middlewares/auth.handler");
const { uploadMiddleware } = require("../utils/storage.handler");

const router = express.Router();

const { PUBLIC_URL } = require("../../const.json");

//GET ALL IMAGES
router.get("/", async (req, res, next) => {
  try {
    const { size } = req.query;
    const filter = req.body;
    const images = await service.getAll(size || 10, filter);
    res.json({
      success: true,
      message: "images found successfully",
      data: images,
    });
  } catch (error) {
    next(error);
  }
});

//GET ALL IMAGES FROM NEWS
router.get("/news/:idNews", async (req, res, next) => {
  try {
    const { size } = req.query;
    const { idNews } = req.params;
    const images = await service.getAll(size || 10, { idn_imagen: idNews });
    res.json({
      success: true,
      message: "images found successfully",
      data: images,
    });
  } catch (error) {
    next(error);
  }
});

//GET IMAGE BY ID
router.get(
  "/:idImage",
  validatorHandler(getImageDto, "params"),
  async (req, res, next) => {
    try {
      const { idImage } = req.params; //Obtener ids
      const images = await service.getById(idImage);
      res.json({
        success: true,
        message: "image found successfully",
        url: `${PUBLIC_URL}/${images.file_name}`,
        data: images,
      });
    } catch (error) {
      next(error);
    }
  }
);

//CREATE IMAGE
router.post(
  "/:newsId",
  authHandler,
  checkRolHandler(false),
  uploadMiddleware.single("file"),
  async (req, res, next) => {
    try {
      const { body, file } = req;
      const { newsId } = req.params;

      const imageBody = {
        ...body,
        idn_imagen: newsId,
        contenido_imagen: file.path,
      };

      const images = await service.create(imageBody); //Para updates y creates
      const fileData = {
        contenido_imagen: file.filename,
        url: `${PUBLIC_URL}/${file.filename}`,
        data: images,
      };

      res.json({
        success: true, //Validaciones FrontEnd
        message: `Image created successfully - ${file["filename"]}`, //Mostrar al usuario
        data: fileData, //Desplegar información en algún formato
      });
    } catch (error) {
      next(error);
    }
  }
);

//UPDATE IMAGE BY ID
router.patch(
  "/:idImage",
  authHandler,
  checkRolHandler(false),
  validatorHandler(getImageDto, "params"),
  validatorHandler(updateImageDto, "body"),
  async (req, res, next) => {
    try {
      const { idImage } = req.params; //Obtener ids
      const body = req.body;
      const { old, changed } = await service.update(idImage, body);
      res.json({
        success: true,
        message: "Image updated successfully",
        url: `${PUBLIC_URL}/${changed.file_name}`,
        Original: old,
        Updated: changed,
      });
    } catch (error) {
      next(error);
    }
  }
);

// DELETE IMAGE
router.delete(
  "/:idImage",
  authHandler,
  checkRolHandler(false),
  validatorHandler(getImageDto, "params"),
  async (req, res, next) => {
    try {
      const { idImage } = req.params; //Obtener ids
      images = await service.delete(idImage);
      res.json({
        success: true,
        message: "Image eliminated successfully",
        image: images,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
