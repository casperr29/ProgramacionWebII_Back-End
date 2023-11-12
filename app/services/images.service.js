const boom = require("@hapi/boom");
const ImagesModel = require("../models/images.model");
const NewsModel = require("../models/news.model");

const NOT_FOUND_COLL_MSG = "Collection doesn't exists";
const NO_IMAGES_REGISTERED_MSG = "There are no images registered";
const IMAGES_NOT_FOUND_MSG = "Image not found: ";

class ImagesService {
  constructor() {
    this.imagen = [];
  }

  //DB METHODS-----------------------------------------

  async create(data) {
    const { idn_imagen } = data;

    //Validar que exista la noticia a la que se agregará el imagen
    const imageNews = await NewsModel.findOne({
      _id: idn_imagen,
    });

    if (!imageNews) {
      throw boom.notFound("News doesnt exists");
    }

    const newsImages = await ImagesModel.create(data);

    // const correctImage = await ImagesModel.findOne({
    //   _id: newsImages._id,
    // });

    // imageNews.Images.push(correctImage);
    // imageNews.save();

    return newsImages;
  }

  async update(ImageId, changes) {
    let imagen = await ImagesModel.findOne({
      _id: ImageId,
    });

    if (imagen == undefined || imagen == null)
      throw new boom.notFound(IMAGES_NOT_FOUND_MSG + ImageId);

    let oldImages = {
      idn_imagen: imagen.idn_imagen,
      contenido_imagen: imagen.contenido_imagen,
      fecha_imagen: imagen.fecha_imagen,
      isactive_imagen: imagen.isactive_imagen,
    };

    const { isactive_imagen } = changes;

    imagen.isactive_imagen =
      isactive_imagen === undefined ? imagen.isactive_imagen : isactive_imagen;
    await imagen.save();

    //Obtenemos el new de la foto
    // const imageNews = await NewsModel.findOne({
    //   _id: imagen.idn_imagen,
    // });

    //Obtenemos el imagen desactualizado de la noticia
    // let prevImage = imageNews.Images.find(
    //   (element) => element["_id"] == ImageId
    // );

    // console.log(prevImage);
    // imageNews.Images.remove(prevImage); //Removemos el imagen desactualizado a la noticia
    // imageNews.Images.push(imagen); //Añadimos el imagen actualizado a la noticia
    // await imageNews.save();

    // console.log(imagen);

    return {
      old: oldImages,
      changed: imagen,
    };
  }

  async delete(imageId) {
    let imagen = await ImagesModel.findOne({
      _id: imageId,
    });

    const { deletedCount } = await ImagesModel.deleteOne({
      _id: imageId,
    });

    if (deletedCount <= 0)
      throw new boom.notFound(NOT_FOUND_COLL_MSG + imageId);

    // const imageNews = await NewsModel.findOne({
    //   _id: imagen.idn_imagen,
    // });

    // imageNews.Images.remove(imagen);
    // imageNews.save();

    return imagen;
  }

  async getAll(limit, filter) {
    let imagen = await ImagesModel.find(filter);

    if (!imagen) throw boom.notFound(NOT_FOUND_COLL_MSG);
    else if (imagen.length <= 0) throw boom.notFound(NO_IMAGES_REGISTERED_MSG);

    imagen = limit
      ? imagen.filter((item, index) => item && index < limit)
      : imagen;

    return imagen;
  }

  async getById(imageId) {
    let imagen = await ImagesModel.findOne({
      _id: imageId,
    });

    if (imagen == undefined || imagen == null)
      throw new boom.notFound(IMAGES_NOT_FOUND_MSG + imageId);

    return imagen;
  }
}

module.exports = ImagesService;
