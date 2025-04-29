const express = require("express");
const db = require("./lib/db");
const error = require("./lib/error");
const middlewares = require("./middleware");
const routes = require("./routes");
const uiHandle = require("./middleware/uiHandle");

const app = express();
db(app);
middlewares(app);
routes(app);
uiHandle(app);

error(app);

module.exports = app;
