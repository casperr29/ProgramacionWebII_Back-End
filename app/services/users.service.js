const boom = require('@hapi/boom');
const UserModel = require('../models/users.model');

const NOT_FOUND_COLL_MSG = "Collection doesn't exists";
const NO_USERS_REGISTERED_MSG = 'There are no users registered';
const USER_NOT_FOUND_MSG = 'User not found: ';

class UserService {
  constructor() {
    this.users = [];
  }

  //-------------DB METHODS----------------//
  //#region DB METHODS

  //CREATE DB USER
  async create(data) {
    const existsEmail = await UserModel.findOne({
      correo_usuario: data.correo_usuario,
    });

    if (existsEmail) {
      throw boom.unauthorized('There is already a user with that email');
    }

    data.tipo_usuario = data.tipo_usuario || true;

    const newUser = await UserModel.create(data);
    newUser.set('password_usuario', undefined, { strict: false });
    return newUser;
  }

  //UPDATE DB USER
  async update(userId, changes) {
    let user = await UserModel.findOne({
      _id: userId,
    });

    if (user == undefined || user == null)
      throw new boom.notFound(USER_NOT_FOUND_MSG + userId);

    const { correo_usuario } = changes;

    if (correo_usuario != null && correo_usuario != undefined) {
      const existsEmail = await UserModel.findOne({
        correo_usuario: correo_usuario,
      });

      if (existsEmail && existsEmail._id != userId) {
        throw boom.unauthorized('There is already a user with that email');
      }
    }

    let oldUser = {
      nombre_usuario: user.nombre_usuario,
      correo_usuario: user.correo_usuario,
      password_usuario: user.password_usuario,
      foto_usuario: user.foto_usuario,
      reporte_usuario: user.reporte_usuario,
      isactive_usuario: user.isactive_usuario,
      tipo_usuario: user.tipo_usuario,
    };

    const {
      nombre_usuario,
      password_usuario,
      foto_usuario,
      reporte_usuario,
      isactive_usuario,
      tipo_usuario,
    } = changes;

    user.nombre_usuario = nombre_usuario || user.nombre_usuario;
    user.correo_usuario = correo_usuario || user.correo_usuario;
    user.password_usuario = password_usuario || user.password_usuario;
    user.foto_usuario = foto_usuario || user.foto_usuario;
    user.reporte_usuario = reporte_usuario || user.reporte_usuario;
    user.tipo_usuario = tipo_usuario || user.tipo_usuario;
    user.isactive_usuario =
      isactive_usuario === undefined ? user.isactive_usuario : isactive_usuario;
    user.save();

    return {
      old: oldUser,
      changed: user,
    };
  }

  //UPDATE PROFILE IMAGE
  async updateProfilePic(userId, changes) {
    let user = await UserModel.findOne({
      _id: userId,
    });

    if (user == undefined || user == null)
      throw new boom.notFound(USER_NOT_FOUND_MSG + userId);

    let oldUser = {
      nombre_usuario: user.nombre_usuario,
      correo_usuario: user.correo_usuario,
      password_usuario: user.password_usuario,
      foto_usuario: user.foto_usuario,
      reporte_usuario: user.reporte_usuario,
      isactive_usuario: user.isactive_usuario,
      tipo_usuario: user.tipo_usuario,
    };

    user.foto_usuario = { ...changes };
    user.save();

    return {
      old: oldUser,
      changed: user,
    };
  }

  //GET DB USER BY ID
  async getById(userId) {
    let user = await UserModel.findOne({
      _id: userId,
    });

    if (user == undefined || user == null)
      throw new boom.notFound(USER_NOT_FOUND_MSG + userId);

    return user;
  }

  //GET DB USER BY EMAIL
  async getByEmail(userEmail) {
    let user = await UserModel.findOne({
      correo_usuario: userEmail,
    });

    if (user == undefined || user == null)
      throw new boom.notFound(USER_NOT_FOUND_MSG + userEmail);

    return user;
  }

  //DELETE DB USER
  async delete(userId) {
    let user = await UserModel.findOne({
      _id: userId,
    });

    const { deletedCount } = await UserModel.deleteOne({
      _id: userId,
    });

    if (deletedCount <= 0) throw new boom.notFound(USER_NOT_FOUND_MSG + userId);

    user.set('password_usuario', undefined, { strict: true });
    return user;
  }

  //GET ALL USERS DB
  async getAll(limit, filter) {
    let users = await UserModel.find(filter);

    if (!users) throw boom.notFound(NOT_FOUND_COLL_MSG);
    else if (users.length <= 0) throw boom.notFound(NO_USERS_REGISTERED_MSG);

    users = limit
      ? users.filter((item, index) => item && index < limit)
      : users;

    return users;
  }
  //#endregion
}

module.exports = UserService;
