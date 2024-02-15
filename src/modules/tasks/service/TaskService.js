const Task = require('../model/Tasks');

class TaskService {
    async createTask(idUser, taskType, dateStart, note) {
        try{
            let status = "backlog";
            let taskCode = this.generateTaskCode(taskType);
            let task = {idUser, taskType, taskCode, dateStart, note, status};
            let newTask = new Task(task);
            return newTask
        } catch (error){
            throw error
        }
    }

    async getTaskByUser(idUser) {
        try{
           const task = Task.findOne({idUser});
           if(!task) throw 'No tasks found for this user';
           return task;
        } catch (error){
            throw error
        }
    }
    async getTaskById(taskCode) {
        try{
            const task = Task.findOne({taskCode})
            if(!task) throw 'No tasks found for this code';
            return task;
        } catch (error){
            throw error
        }
    }
    async updateTask(taskCode, status) {
        try{
            task = Task.findOne({taskCode})
            idTask = task._id;
            if(status == 'doing') {
                const dateStart = Date.now(); 
                const dateEnd = new Date();
                dateEnd.setDate(dateStart.getDate() + 5);
                const taskUpdate = Task.findByIdAndUpdate({
                    _id : idTask,
                    dateStart,
                    dateEnd,
                    status
                })
                return taskUpdate;
            }
            if(status == 'review'){
                const date = Date.now();
                dateEnd.setDate(date.getDate() + 3);
                const taskUpdate = Task.findByIdAndUpdate({
                    _id: idTask,
                    dateEnd, 
                    status
                });
                return taskUpdate;
            }
            if(status == 'onDeployment'){
                const date = Date.now();
                dateEnd.setDate(date.getDate() + 2);
                const taskUpdate = Task.findByIdAndUpdate({
                    _id: idTask,
                    dateEnd,
                    status
                });
                return taskUpdate;
            }
            if(status == "done"){
                const dateEnd = Date.now();
                const taskUpdate = Task.findByIdAndUpdate({
                    _id: idTask,
                    dateEnd,
                    status
                });
                return taskUpdate  
            }
        } catch (error){
            throw error
        }
    }
    async deleteTaskByCode(taskCode) {
        try{
            task = Task.findOne({taskCode});
            if(!task) {
                return "Tarefa não encontrada";
            }
            await Task.deleteOne({_id : task._id})
            return "Sucesso ao deletar a tarefa"
        } catch (error){
            throw error
        }
    }
    async generateTaskCode(taskType) {
        try {
            let baseCode = taskType.toUpperCase().slice(0, 3); // Pegar os 3 primeiros caracteres do taskType em maiúsculas
            let code;
            let isUnique = false;
            let counter = 1;
    
            // Loop até encontrar um código único
            while (!isUnique) {
                // Formatar o contador com três dígitos (por exemplo, 001, 002, ..., 010, 011, ...)
                let formattedCounter = counter.toString().padStart(3, '0');
                code = `${baseCode}${formattedCounter}`;
    
                // Verificar se o código já existe no banco de dados
                let existingTask = await Task.findOne({ taskCode: code });
    
                if (!existingTask) {
                    isUnique = true; // O código é único, pode sair do loop
                } else {
                    counter++; // Incrementar o contador e tentar novamente
                }
            }
    
            return code;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new TaskService();