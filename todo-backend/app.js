var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();

var taskRouter = require("./src/routes/task.router");
var projectRouter = require("./src/routes/project.router");
var userRouter = require("./src/routes/user.router");

require("./src/config/config.js");

app.use(bodyParser.json());
//entende quando a URL vier com parametros
app.use(bodyParser.urlencoded([{ extended: true }]));
app.use(cors());

app.use("/api/task", taskRouter);
app.use("/api/project", projectRouter);
app.use("/api/user", userRouter);

module.exports = app;
