const express = require('express');
const Router = express.Router;
const auth = require('./middleware/auth');
const UserController = require('./modules/user/controllers/UserController');
const TaskControlller = require('./modules/tasks/controller/TaskController');
const TaskController = require('./modules/tasks/controller/TaskController');
const routes = new Router();


routes.get('/user/:id', UserController.index); // Get user by his Id
routes.post('/user', UserController.register); // Create user
routes.get('/user/:id', UserController.user); //List all users
routes.delete('/user/:id', UserController.destroy); //Delete a User

// Tasks Routes

routes.post('/user/:user_id/task', TaskControlller.create); // Create task
routes.get('/user/:user_id/task', TaskControlller.taskByUser); // Get all the Task by users
routes.get('/task', TaskControlller.taskByCode); //Get task by TaskCode
routes.put('/task', TaskController.update); // Update task with the taskCode
// routes.delete('/task', TaskController.delete); //Delete task with the TaskCode


// test 
module.exports = routes;