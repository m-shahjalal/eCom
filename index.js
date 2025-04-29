require("dotenv").config();
const http = require("http");
const app = require("./server/app");
const logger = require("./server/utils/logger");
const port = process.env.PORT || 4000;

if (process.env.NODE_ENV === "development") {
  const server = http.createServer(app);
  return server.listen(port, () =>
    logger.info(`server listening on port ${port}`)
  );
}

module.exports = app;
