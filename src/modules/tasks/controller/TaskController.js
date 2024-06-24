const taskService = require('../service/TaskService');
const Task = require('../model/Tasks');
const User = require('../../user/model/User');
const taskUtils = require('../utils/TaskUtils')


class TaskController {
    async create(req, res) {
        const {user_id} = req.params;
        const {taskType, dateStart, note} = req.body;
        try{
            const user = User.findById(user_id);
            if(!user) {
                return await res.status(404).json({message : "User not Found!"});
            }
            const taskCode = await taskUtils.generateTaskCode(taskType);
            const newTask = new Task({
                taskCode,
                taskType,
                dateStart,
                note,
                userId : user_id
            });
    
            await newTask.save();
            return res.status(201).json({
                message : 'User succefully created',
                data : newTask
            });
        } catch(error) {
            console.log("Error in creating a task: ", error);
            return res.status(500).json({
                message: "Error in creating a task",
                data: error
            });
        } 
    }
    async taskByUser(req, res){
        const idUser= req.params;
        try{
           const tasks =  await taskService.getTaskByIdUser(idUser.userId);
           if(!tasks) throw new Error("No tasks found");
           return res.status(200).json(tasks);
        }catch(error){
             return res.status(404).json(error.message || 'Error getting tasks by user')
        }
    }

    async taskByCode(req, res){
        const code = req.query.taskCode;
        try{
            const task = await taskService.getTaskById(code);
            if(!task) {
                return res.status(404).json({message: 'Task not found!'})
            }
            return res.status(200).json(task);
        }catch(error){
            return res.status(400).json(error.message || "Error getting the task");
        }
    }

    async update(req, res){
        const taskCode = req.query.taskCode;
        const status = req.body.status;
        try{
            const updatedTask = await taskService.updateTask(taskCode, status);
            console.log(updatedTask)
            return  res.status(200).json({message: `Task updated to ${status}`,
                updatedTask});
        } catch(error) {
            console.log("Error in updating the task: ", error);
            return res.status(500).json({
                message: "Error in updating the task",
                data: error
            });
        }
    }

    // async delete(req, res) {
    //     const taskCode = req.query.taskCode;
    //     try{
    //         await taskService.deleteTaskByCode(taskCode);
    //         return res.status(200).json({message: 'User deleted succesfully'});
    //     } catch(error) {
    //         return res.status(500).json({message: error});
    //     }
    // }
}

 module.exports = new TaskController();