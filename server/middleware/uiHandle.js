const express = require("express");
const path = require("path");

module.exports = (app) => {
  app.use(express.static(path.join(process.cwd(), "client/build")));

  app.get("*", (_, res) =>
    res.sendFile(path.join(process.cwd(), "client/build", "index.html"))
  );
};
