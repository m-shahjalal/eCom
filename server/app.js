const express = require("express");
const path = require("path");
const db = require("./lib/db");
const error = require("./lib/error");
const middlewares = require("./middleware");
const routes = require("./routes");

const app = express();
db(app);
middlewares(app);

app.use("/api", (_req, _res, next) => {
  next();
});

const initializeRoutes = () => {
  routes.forEach((route) => {
    app.use(`/api${route.path}`, route.router);
  });
};

initializeRoutes();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

error(app);

module.exports = app;
