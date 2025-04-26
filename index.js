require("dotenv").config();
const http = require("http");
const app = require("./server/app");
const logger = require("./server/utils/logger");
const port = process.env.PORT || 4000;

const server = http.createServer(app);
server.listen(port, () => logger.info(`server listening on port ${port}`));
