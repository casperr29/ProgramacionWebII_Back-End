const express = require("express");
const boom = require("@hapi/boom");
const UserService = require("../services/users.service");
const service = new UserService();
const validatorHandler = require("../middlewares/validator.handler");
const {
  createUserDto,
  updateUserDto,
  getUserDto,
  loginDto,
} = require("../DTOs/users.dto");

const { encrypt, compare } = require("../utils/password.handler");
const { signToken } = require("../utils/jwt.handler");
const checkRolHandler = require("../middlewares/checkRol.handler");
const authHandler = require("../middlewares/auth.handler");
const { uploadMiddleware } = require("../utils/storage.handler");

const router = express.Router();

//RUTAS GENERALES /

//GET ALL USERS
router.get("/", async (req, res, next) => {
  try {
    const { size } = req.query;
    const filter = req.body;
    const users = await service.getAll(size || 10, filter);
    res.json({
      success: true,
      message: "Users found successfully",
      data: users,
    });
  } catch (error) {
    next(error);
  }
});

//REGISTER USER
router.post(
  "/register",
  validatorHandler(createUserDto, "body"),
  async (req, res, next) => {
    try {
      const { body } = req;

      const password_usuario = await encrypt(body["password_usuario"]);
      let bodyInsert = { ...body, password_usuario };

      const user = await service.create(bodyInsert); //Para updates y creates

      res.json({
        success: true, //Validaciones FrontEnd
        message: "User created successfully", //Mostrar al usuario
        data: user, //Desplegar información en algún formato
      });
    } catch (error) {
      next(error);
    }
  }
);

//LOGIN
router.post(
  "/login",
  validatorHandler(loginDto, "body"),
  async (req, res, next) => {
    try {
      const { correo_usuario, password_usuario } = req.body; //Obtener ids
      const user = await service.getByEmail(correo_usuario);
      if (!user) {
        throw boom.notFound("User not found");
      }
      const hashPassword = user.get("password_usuario");
      const check = await compare(password_usuario, hashPassword);
      if (!check) {
        throw boom.unauthorized("Wrong credentials");
      }
      user.set("password_usuario", undefined, { strict: false });
      res.json({
        success: true,
        token: await signToken(user),
        message: "User logged successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
);

//RUTAS ESPECIFICAS /:userId

//GET USER BY ID
router.get(
  "/:userId",
  authHandler,
  checkRolHandler(false),
  validatorHandler(getUserDto, "params"),
  async (req, res, next) => {
    try {
      const { userId } = req.params; //Obtener ids
      const user = await service.getById(userId);
      res.json({
        success: true,
        message: "User found successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
);

//UPDATE PROFILE PICTURE
router.patch(
  "/update_prof_pic/:userId",
  authHandler,
  checkRolHandler(false),
  validatorHandler(getUserDto, "params"),
  uploadMiddleware.single("file"),
  async (req, res, next) => {
    try {
      const { userId } = req.params; //Obtener ids
      const { body, file } = req;

      const photoBody = {
        ...body,
        file_name: file.filename,
        path: file.path,
      };

      const { old, changed } = await service.updateProfilePic(
        userId,
        photoBody
      );
      res.json({
        success: true,
        message: "Profile picture updated successfully",
        Original: old,
        Updated: changed,
      });
    } catch (error) {
      next(error);
    }
  }
);

//PARTIALLY UPDATE USER
router.patch(
  "/:userId",
  authHandler,
  checkRolHandler(false),
  validatorHandler(getUserDto, "params"),
  validatorHandler(updateUserDto, "body"),
  async (req, res, next) => {
    try {
      const { userId } = req.params; //Obtener ids
      let { body } = req;

      const password_usuario =
        body["password_usuario"] == undefined
          ? null
          : await encrypt(body["password_usuario"]);

      const bodyUpdate = { ...body, password_usuario };

      const { old, changed } = await service.update(userId, bodyUpdate);
      res.json({
        success: true,
        message: "User updated successfully",
        Original: old,
        Updated: changed,
      });
    } catch (error) {
      next(error);
    }
  }
);

//DELETE USER
router.delete(
  "/:userId",
  authHandler,
  checkRolHandler(true),
  validatorHandler(getUserDto, "params"),
  async (req, res, next) => {
    try {
      const { userId } = req.params; //Obtener ids
      deletedUser = await service.delete(userId);
      res.json({
        success: true,
        message: "User eliminated successfully",
        user: deletedUser,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
