const boom = require("@hapi/boom");
const VideosModel = require("../models/videos.model");
const NewsModel = require("../models/news.model");

const NOT_FOUND_COLL_MSG = "Collection doesn't exists";
const NO_VIDEOS_REGISTERED_MSG = "There are no videos registered";
const VIDEOS_NOT_FOUND_MSG = "Video not found: ";

class VideosService {
  constructor() {
    this.video = [];
  }

  //DB METHODS-----------------------------------------

  async create(data) {
    const { idn_video } = data;

    //Validar que exista la noticia a la que se agregará el video
    const videoNews = await NewsModel.findOne({
      _id: idn_video,
    });

    if (!videoNews) {
      throw boom.notFound("News doesnt exists");
    }

    const newsVideos = await VideosModel.create(data);

    // const correctVideo = await VideosModel.findOne({
    //   _id: newsVideos._id,
    // });

    // videoNews.Videos.push(correctVideo);
    // videoNews.save();

    return newsVideos;
  }

  async update(VideoId, changes) {
    let video = await VideosModel.findOne({
      _id: VideoId,
    });

    if (video == undefined || video == null)
      throw new boom.notFound(VIDEOS_NOT_FOUND_MSG + VideoId);

    let oldVideos = {
      idn_video: video.idn_video,
      contenido_video: video.contenido_video,
      fecha_video: video.fecha_video,
      isactive_video: video.isactive_video,
    };

    const { isactive_video } = changes;

    video.isactive_video =
      isactive_video === undefined ? video.isactive_video : isactive_video;
    await video.save();

    //Obtenemos el new de la foto
    // const videoNews = await NewsModel.findOne({
    //   _id: video.idn_video,
    // });

    // //Obtenemos el video desactualizado de la noticia
    // let prevVideo = videoNews.Videos.find(
    //   (element) => element["_id"] == VideoId
    // );

    // console.log(prevVideo);
    // videoNews.Videos.remove(prevVideo); //Removemos el video desactualizado a la noticia
    // videoNews.Videos.push(video); //Añadimos el video actualizado a la noticia
    // await videoNews.save();

    console.log(video);

    return {
      old: oldVideos,
      changed: video,
    };
  }

  async delete(videoId) {
    let video = await VideosModel.findOne({
      _id: videoId,
    });

    const { deletedCount } = await VideosModel.deleteOne({
      _id: videoId,
    });

    if (deletedCount <= 0)
      throw new boom.notFound(NOT_FOUND_COLL_MSG + videoId);

    // const videoNews = await NewsModel.findOne({
    //   _id: video.idn_video,
    // });

    // videoNews.Videos.remove(video);
    // videoNews.save();

    return video;
  }

  async getAll(limit, filter) {
    let video = await VideosModel.find(filter);

    if (!video) throw boom.notFound(NOT_FOUND_COLL_MSG);
    else if (video.length <= 0) throw boom.notFound(NO_VIDEOS_REGISTERED_MSG);

    video = limit
      ? video.filter((item, index) => item && index < limit)
      : video;

    return video;
  }

  async getById(videoId) {
    let video = await VideosModel.findOne({
      _id: videoId,
    });

    if (video == undefined || video == null)
      throw new boom.notFound(VIDEOS_NOT_FOUND_MSG + videoId);

    return video;
  }
}

module.exports = VideosService;
