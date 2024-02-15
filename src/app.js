const express = require('express');
const cors = require('cors');
const routes = require('./routes.js')
require('./database/index.js')

class App {
    constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares(){
    // Middleware de EXPRESS.JSON() para permitir acesso externo
    this.server.use(express.json());
    // Middleware de CORS para permitir acesso externo
    this.server.use(cors());
  }
  routes() {
    this.server.use(routes);
  }
}

module.exports = new App().server;