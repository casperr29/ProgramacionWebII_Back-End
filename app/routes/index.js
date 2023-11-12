const express = require("express");
const usersRouter = require("./users.router");
const videogamesRouter = require("./videogames.router");
const newsRouter = require("./news.router");
const commentsRouter = require("./comments.router");
const reactionsRouter = require("./reactions.router");
const imagesRouter = require("./images.router");
const videosRouter = require("./videos.router");

const routerApi = (app) => {
  const router = express.Router();
  app.use("/api/v1", router);
  //endpoints de la v1
  router.use("/users", usersRouter);
  router.use("/videogames", videogamesRouter);
  router.use("/news", newsRouter);
  router.use("/comments", commentsRouter);
  router.use("/reactions", reactionsRouter);
  router.use("/images", imagesRouter);
  router.use("/videos", videosRouter);
};

module.exports = routerApi;
