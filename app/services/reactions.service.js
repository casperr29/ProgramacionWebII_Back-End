const ReactionModel = require("../models/reactions.model");
const NewsModel = require("../models/news.model");
const UserModel = require("../models/users.model");
const boom = require("@hapi/boom");

const NOT_FOUND_COLL_MSG = "Collection doesn't exists";
const NO_REACTIONS_REGISTERED_MSG = "There are no reactions registered";
const REACTION_NOT_FOUND_MSG = "Reaction not found: ";

class CommentsService {
  constructor() {
    this.reactions = [];
  }

  //-------------DB METHODS----------------//
  //#region DB METHODS

  //CREATE DB REACTION
  async create(data) {
    const { idu_reaccion, idn_reaccion, liked } = data;

    const existsReaction = await ReactionModel.findOne({
      idu_reaccion: idu_reaccion,
      idn_reaccion: idn_reaccion,
    });

    if (existsReaction) {
      throw boom.unauthorized(
        "There already exists a reaction for this user on this news"
      );
    }

    //Validar que si exista la noticia a la que se busca reaccionar
    const reactionNews = await NewsModel.findOne({
      _id: idn_reaccion,
    });

    if (!reactionNews) {
      throw boom.notFound("News doesnt exists");
    }

    //Validar que si exista el usuario que busca reaccionar
    const reactionUser = await UserModel.findOne({
      _id: idu_reaccion,
    });

    if (!reactionUser) {
      throw boom.notFound("User doesnt exists");
    }

    if (liked == 1) reactionNews.likes_noticia = reactionNews.likes_noticia + 1;
    if (liked == -1)
      reactionNews.dislikes_noticia = reactionNews.dislikes_noticia + 1;

    reactionNews.save();

    const newReaction = await ReactionModel.create(data);
    return newReaction;
  }

  //UPDATE DB REACTION
  async update(reactionId, changes) {
    let reaction = await ReactionModel.findOne({
      _id: reactionId,
    });

    if (reaction == undefined || reaction == null)
      throw new boom.notFound(REACTION_NOT_FOUND_MSG + reactionId);

    //Validar que si exista la noticia a la que se busca reaccionar
    const reactionNews = await NewsModel.findOne({
      _id: reaction.idn_reaccion,
    });

    if (!reactionNews) {
      throw boom.notFound("News doesnt exists");
    }

    //Validar que si exista el usuario que busca reaccionar
    const reactionUser = await UserModel.findOne({
      _id: reaction.idu_reaccion,
    });

    if (!reactionUser) {
      throw boom.notFound("User doesnt exists");
    }

    let oldReaction = {
      idu_reaccion: reaction.idu_reaccion,
      idn_reaccion: reaction.idn_reaccion,
      liked: reaction.liked,
    };

    const { liked } = changes;

    if (liked != undefined && oldReaction.liked != liked) {
      switch (liked) {
        case 0:
          reactionNews.likes_noticia =
            oldReaction.liked == 1
              ? reactionNews.likes_noticia - 1
              : reactionNews.likes_noticia;

          reactionNews.dislikes_noticia =
            oldReaction.liked == -1
              ? reactionNews.dislikes_noticia - 1
              : reactionNews.dislikes_noticia;
          break;
        case 1:
          reactionNews.likes_noticia += 1;

          reactionNews.dislikes_noticia =
            oldReaction.liked == -1
              ? reactionNews.dislikes_noticia - 1
              : reactionNews.dislikes_noticia;
          break;
        case -1:
          reactionNews.dislikes_noticia += 1;

          reactionNews.likes_noticia =
            oldReaction.liked == 1
              ? reactionNews.likes_noticia - 1
              : reactionNews.likes_noticia;
          break;

        default:
          break;
      }
    }

    reaction.liked = liked === undefined ? reaction.liked : liked;
    reaction.save();

    reactionNews.save();

    return {
      old: oldReaction,
      changed: reaction,
    };
  }

  //DELETE DB REACTION
  async delete(reactionId) {
    let reaction = await ReactionModel.findOne({
      _id: reactionId,
    });

    const { deletedCount } = await ReactionModel.deleteOne({
      _id: reactionId,
    });

    if (deletedCount <= 0)
      throw new boom.notFound(REACTION_NOT_FOUND_MSG + reactionId);

    const reactionNews = await NewsModel.findOne({
      _id: reaction.idn_reaccion,
    });

    if (reaction.liked == -1)
      reactionNews.dislikes_noticia = reactionNews.dislikes_noticia - 1;
    else if (reaction.liked == 1)
      reactionNews.likes_noticia = reactionNews.likes_noticia - 1;

    reactionNews.save();

    return reaction;
  }

  //GET ALL DB REACTIONS
  async getAll(limit, filter) {
    let reactions = await ReactionModel.find(filter)
      .populate("idu_reaccion")
      .populate("idn_reaccion");

    if (!reactions) throw boom.notFound(NOT_FOUND_COLL_MSG);
    else if (reactions.length <= 0)
      throw boom.notFound(NO_REACTIONS_REGISTERED_MSG);

    reactions = limit
      ? reactions.filter((item, index) => item && index < limit)
      : reactions;

    return reactions;
  }

  //GET DB REACTION BY ID
  async getById(reactionId) {
    let reaction = await ReactionModel.findOne({
      _id: reactionId,
    })
      .populate("idu_reaccion")
      .populate("idn_reaccion");

    if (reaction == undefined || reaction == null)
      throw new boom.notFound(REACTION_NOT_FOUND_MSG + reactionId);

    return reaction;
  }
  //#endregion
}

module.exports = CommentsService;
