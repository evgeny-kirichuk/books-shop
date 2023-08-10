const express = require("express");
const cors = require("cors");
const path = require("path");
const logger = require("./utils/logger");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      auth: "/api/books",
    };

    this.#middlewares();
    this.#routes();
  }

  #middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(logger);

    this.app.use(express.static(path.join(__dirname, "../client/build")));
  }

  #routes() {
    this.app.use(this.paths.auth, require("./routes/books"));

    this.app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/build/index.html"));
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on port: ", this.port);
    });
  }
}

module.exports = Server;
