const boom = require('@hapi/boom');
const VideogameModel = require('../models/videogames.model');

const NOT_FOUND_COLL_MSG = "Collection doesn't exists";
const NO_VIDEOGAMES_REGISTERED_MSG = 'There are no Videogames registered';
const VIDEOGAME_NOT_FOUND_MSG = 'Videogame not found: ';

class VideogameService {
  constructor() {
    this.Videogames = [];
  }

  //-------------DB METHODS----------------//
  //#region DB METHODS

  //CREATE DB VIDEOGAME
  async create(data) {
    const existsName = await VideogameModel.findOne({
      nombre_videojuego: data.nombre_videojuego,
    });

    if (existsName) {
      throw boom.unauthorized('There is already a Videogame with that name');
    }

    const newVideogame = await VideogameModel.create(data);
    newVideogame.set('descripcion_videojuego', undefined, { strict: false });
    return newVideogame;
  }

  //UPDATE DB VIDEOGAME
  async update(videogameId, changes) {
    let videogame = await VideogameModel.findOne({
      _id: videogameId,
    });

    if (videogame == undefined || videogame == null)
      throw new boom.notFound(VIDEOGAME_NOT_FOUND_MSG + videogameId);

    const { nombre_videojuego } = changes;

    if (nombre_videojuego != null && nombre_videojuego != undefined) {
      const existsName = await VideogameModel.findOne({
        nombre_videojuego: nombre_videojuego,
      });

      if (existsName && existsName._id != videogameId) {
        throw boom.unauthorized('There is already a videogame with that email');
      }
    }

    let oldVideogame = {
      nombre_videojuego: videogame.nombre_videojuego,
      imagen_videojuego: videogame.imagen_videojuego,
      descripcion_videojuego: videogame.descripcion_videojuego,
      isactive_videojuego: videogame.isactive_videojuego,
    };

    const { descripcion_videojuego, imagen_videojuego, isactive_videojuego } =
      changes;

    videogame.nombre_videojuego =
      nombre_videojuego || videogame.nombre_videojuego;
    videogame.imagen_videojuego =
      imagen_videojuego || videogame.imagen_videojuego;
    videogame.descripcion_videojuego =
      descripcion_videojuego || videogame.descripcion_videojuego;
    videogame.isactive_videojuego =
      isactive_videojuego === undefined
        ? videogame.isactive_videojuego
        : isactive_videojuego;
    videogame.save();

    return {
      old: oldVideogame,
      changed: videogame,
    };
  }

  //UPDATE VIDEOGAME IMAGE
  async updateVideogamePic(videogameId, changes) {
    let videogame = await VideogameModel.findOne({
      _id: videogameId,
    });

    if (videogame == undefined || videogame == null)
      throw new boom.notFound(VIDEOGAME_NOT_FOUND_MSG + videogameId);

    let oldVideogame = {
      nombre_videojuego: videogame.nombre_videojuego,
      descripcion_videojuego: videogame.descripcion_videojuego,
      imagen_videojuego: videogame.imagen_videojuego,
      isactive_videojuego: videogame.isactive_videojuego,
    };

    videogame.imagen_videojuego = { ...changes };
    videogame.save();

    return {
      old: oldVideogame,
      changed: videogame,
    };
  }

  //GET DB VIDEOGAME BY ID
  async getById(VideogameId) {
    let Videogame = await VideogameModel.findOne({
      _id: VideogameId,
    });

    if (Videogame == undefined || Videogame == null)
      throw new boom.notFound(VIDEOGAME_NOT_FOUND_MSG + VideogameId);

    return Videogame;
  }

  //GET DB VIDEOGAME BY EMAIL
  async getByName(VideogameName) {
    let Videogame = await VideogameModel.findOne({
      nombre_videojuego: VideogameName,
    });

    if (Videogame == undefined || Videogame == null)
      throw new boom.notFound(VIDEOGAME_NOT_FOUND_MSG + VideogameName);

    return Videogame;
  }

  //DELETE DB VIDEOGAME
  async delete(VideogameId) {
    let Videogame = await VideogameModel.findOne({
      _id: VideogameId,
    });

    const { deletedCount } = await VideogameModel.deleteOne({
      _id: VideogameId,
    });

    if (deletedCount <= 0)
      throw new boom.notFound(VIDEOGAME_NOT_FOUND_MSG + VideogameId);

    return Videogame;
  }

  //GET ALL VIDEOGAMES DB
  async getAll(limit, filter) {
    let Videogames = await VideogameModel.find(filter);

    if (!Videogames) throw boom.notFound(NOT_FOUND_COLL_MSG);
    else if (Videogames.length <= 0)
      throw boom.notFound(NO_VIDEOGAMES_REGISTERED_MSG);

    Videogames = limit
      ? Videogames.filter((item, index) => item && index < limit)
      : Videogames;

    return Videogames;
  }
  //#endregion
}

module.exports = VideogameService;
