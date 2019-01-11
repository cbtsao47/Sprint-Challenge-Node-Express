const express = require("express");
const server = express();
const configureMiddleware = require("../config/middleware");
const projectsRouter = require("../routes/projectsRouter");
// const actionsRouter = require("../routes/actionsRouter");

configureMiddleware(server);

server.use("/projects", projectsRouter);
// server.use("/actions", actionsRouter);

module.exports = server;
