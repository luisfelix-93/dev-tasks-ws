const taskService = require('../service/TaskService');

class TaskController {
    async create(req, res) {
       const{idUser, taskCode, dateStart, note} = req.body;
       try{
        const task =  await taskService.create({idUser,taskCode,dateStart,note});
         return res.status(201).json(task);
       } catch(error){
        return res.status(500).json({
            message:'error creating task',
            data: error
        });
       }
    }
    async taskByUser(req, res){
        const idUser= req.params;
        try{
           const tasks =  await taskService.getTasksByIdUser(idUser.userId);
           if(!tasks) throw new Error("No tasks found");
           return res.status(200).json(tasks);
        }catch(error){
             return res.status(404).json(error.message || 'Error getting tasks by user')
        }
    }

    async taskByCode(req, res){
        const code = req.query.taskCode;
        try{
            const task = await taskService.getTasksByCode(code);
            if(!task) {
                return res.status(404).json({message: 'Task not found!'})
            }
            return res.status(200).json(task[0]);
        }catch(error){
            return res.status(400).json(error.message || "Error getting the task");
        }
    }

    async update(req, res){
        const taskCode = req.query.taskCode;
        const status = req.body;
        try{
            const updatedTask = await taskService.updateStatus(taskCode, status);
            return  res.status(200).json(updatedTask);
        } catch(error) {
            return res.status(500).json({message: error});
        }
    }

    async delete(req, res) {
        const taskCode = req.query.taskCode;
        try{
            await taskService.deleteTaskByCode(taskCode);
            return res.status(200).send();
        } catch(error) {
            return res.status(500).json({message: error});
        }
    }
}

 module.exports = new TaskController();