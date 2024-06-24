const Task = require('../model/Tasks');
const User = require('../../user/model/User')

class TaskService {
    async createTask(taskCode, taskType, dateStart, note, userId) {
        try{
            const status = "backlog";
            const task = {
                taskCode,
                taskType,
                dateStart,
                status,
                note,
                userId
            };

            const newTask = new Task(task);
            const savedTask = await newTask.save();
            return newTask;
        } catch (error){
            throw error
        }
    }

    async getTaskByIdUser(idUser) {
        try{
           const task = Task.find({idUser});
           if(!task) throw 'No tasks found for this user';
           return await task;
        } catch (error){
            throw error
        }
    }
    async getTaskById(taskCode) {
        try{
            const task = Task.findOne({taskCode})
            if(!task) throw 'No tasks found for this code';
            return await task;
        } catch (error){
            throw error
        }
    }
    async updateTask(taskCode, status) {
        try {

            const task = await Task.findOne(
                { 
                    taskCode
                }
            ); 
            if (!task) {
                return 'Task not found'
            }
    
            const idTask = task._id;
            let dateEnd;
    
            if (status === 'doing') {
                const dateStart = Date.now();
                dateEnd = new Date(dateStart);
                dateEnd.setDate(dateEnd.getDate() + 5);
                const taskUpdate = await Task.findByIdAndUpdate(idTask, { dateStart, dateEnd, status }, { new: true });
                return taskUpdate;
            }
            
            if (status === 'review') {
                dateEnd = new Date(Date.now());
                dateEnd.setDate(dateEnd.getDate() + 3);
                const taskUpdate = await Task.findByIdAndUpdate(idTask, { dateEnd, status }, { new: true });
                return taskUpdate;
            }
    
            if (status === 'onDeployment') {
                dateEnd = new Date(Date.now());
                dateEnd.setDate(dateEnd.getDate() + 2);
                const taskUpdate = await Task.findByIdAndUpdate(idTask, { dateEnd, status }, { new: true });
                return taskUpdate;
            }
    
            if (status === 'done') {
                dateEnd = Date.now();
                const taskUpdate = await Task.findByIdAndUpdate(idTask, { dateEnd, status }, { new: true });
                return taskUpdate;
            }
    
            throw new Error('Invalid status');
        } catch (error) {
            throw new Error(`Error updating task: ${error}`);
        }
    }
    // async deleteTaskByCode(taskCode) {
    //     try{
    //         const task = Task.findOne({taskCode});
    //         if(!task) {
    //             return "Tarefa não encontrada";
    //         }
    //         await Task.deleteOne(task._id)
    //         return "Sucesso ao deletar a tarefa"
    //     } catch (error){
    //         throw error
    //     }
    // }  
}

module.exports = new TaskService();