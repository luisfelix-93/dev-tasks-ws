const express = require('express');
const Router = express.Router;
const auth = require('./middleware/auth');
const UserController = require('./modules/user/controllers/UserController');
const TaskControlller = require('./modules/tasks/controller/TaskController');
const routes = new Router();

routes.post('/user', UserController.create);
// Authenticated Routes
routes.use(auth);
routes.get('/user', UserController.index);
routes.get('/user/:idUser', UserController.userById);
routes.get('/task/')
routes.post('')
module.exports = routes;