import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './schema/task.schema';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { CreateTaskDTO } from './DTO/createTask.DTO';

@Injectable()
export class TaskService {
    constructor(@InjectModel(Task.name) private task : Model<TaskDocument>) {}

    async findTasks() : Promise<Task[]|null> {
        return await this.task.find().exec();
 
    }

    async findTaskByCode(taskCode : string) : Promise<Task|null> {
        const findTask = this.task.findOne({taskCode}).exec();
        if(!findTask) {
            return null;
        }
        
        return findTask;
    }

    async findTaskByOwner(owner_id : string) : Promise<Task|null> {
        const user = new UserService();
        const findUser = user.findUserById(owner_id);
        if(!findUser) {
            return null;
        }

        const findTask = this.task.findOne({owner : findUser});
        if(!findTask) {
            return null;
        }

        return findTask;
    }

    async register(createTask : CreateTaskDTO) : Promise<Task|null> {

        const taskCode = await this.createTaskCode(createTask.taskType);

        const userService = new UserService();
        const owner_id = createTask.owner_id;
        let manager = null;
        const owner  = userService.findUserById(owner_id);
        if(!owner) {
            return null;
        }

        const manager_id = createTask.manager_id;
        if (!manager_id) {
            manager = null
        }
        manager = userService.findUserById(manager_id);

        const dateCreated = Date.now();

        const status = 'backlog';

        const newTask = new this.task({
            taskCode,
            taskType : createTask.taskType,
            taskTitle : createTask.taskTitle,
            dateCreated,
            dateStart : createTask.dateStart,
            status,
            owner,
            manager,
            note : createTask.note
        })

        return await newTask.save();
    }

    async taskUpdate(taskCode : string, status : string) : Promise<Task | { updatedTask: Task, newTask: Task } | null>  {
        const updateTask = await this.findTaskByCode(taskCode);
        if(!updateTask) {
            return null;
        }
        let dateStart;
        let dateEnd;
        
        if (status === 'doing') {
            dateStart = Date.now();
            dateEnd = new Date(dateStart);
            dateEnd.setDate(dateEnd.getDate() + 5);
            
            updateTask.dateStart = dateStart;
            updateTask.dateEnd = dateEnd;
            updateTask.status = status;

            return await this.task.findOneAndUpdate({taskCode}, updateTask, {new: true}).exec();
        }

        if (status === 'review') {

            if (!updateTask.dateStart) {
                dateStart = Date.now();
                updateTask.dateStart = dateStart;
            }

            dateEnd = Date.now();
            dateEnd.setDate(dateEnd.getDate() + 3);
            updateTask.dateEnd = dateEnd;
            updateTask.status = status;

            const updatedTask = await this.task.findOneAndUpdate({taskCode}, updateTask, {new : true}).exec();

            const taskDTO = new CreateTaskDTO();
            taskDTO.taskType = 'review';
            taskDTO.taskTitle = updateTask.taskTitle;
            taskDTO.dateStart = null;
            taskDTO.owner_id = updateTask.owner_id.user_id;

            const newTask = await this.register(taskDTO);

            return {updatedTask, newTask}
            
        }

        if(status === 'onDeployment') {
            if (!updateTask.dateStart) {
                dateStart = Date.now();
                updateTask.dateStart = dateStart;
            }

            dateEnd = Date.now();
            dateEnd.setDate(dateEnd.getDate() + 2);
            updateTask.dateEnd = dateEnd;
            updateTask.status = status;

            const updatedTask = await this.task.findOneAndUpdate({taskCode}, updateTask, {new : true}).exec();

            const taskDTO = new CreateTaskDTO();
            taskDTO.taskType = 'implementation';
            taskDTO.taskTitle = updateTask.taskTitle;
            taskDTO.dateStart = null;
            taskDTO.owner_id = updateTask.owner_id.user_id;

            const newTask = await this.register(taskDTO);

            return {updatedTask, newTask}
        }
        if(status === 'done') {
            if (!updateTask.dateStart) {
                dateStart = Date.now();
                updateTask.dateStart = dateStart;
            }
            dateEnd = Date.now();
            updateTask.dateEnd = dateEnd;
            updateTask.status = status;

            const updatedTask = await this.task.findOneAndUpdate({taskCode}, updateTask, {new : true}).exec();

            return updatedTask;
        }

        throw new Error('invalid status');
    }

    async updateOwner(codeTask : string, owner_id : string) : Promise<Task| null> {
        const userService = new UserService();
        const findTask = await this.task.findOne({taskCode : codeTask});
        if(!findTask) {
            return null;
        }
        
        const owner = await userService.findUserById(owner_id);
        findTask.owner_id = owner;
        const updatedTask = this.task.findOneAndUpdate({taskCode : codeTask}, findTask, {new : true}).exec();
        return updatedTask;
    }

    async updateManager(codeTask : string, manager_id : string) : Promise<Task|null>{
        const userService = new UserService();
        const findTask = await this.task.findOne({taskCode : codeTask});

        if(!findTask) {
            return null;
        }

        const manager = await userService.findUserById(manager_id);
        findTask.manager_id = manager;

        const updatedTask = this.task.findOneAndUpdate({taskCode : codeTask}, findTask, {new : true}).exec();
        return updatedTask;
    }

    async deleteTask(codeTask : string) : Promise<Task|null> {
        return this.task.findOneAndDelete({taskCode : codeTask}).exec()
    }


    private async createTaskCode(taskType : string) : Promise<string> {
        const baseCode = taskType.slice(0, 3).toUpperCase();
        let code;
        let isUnique = false;
        let counter  = 1;

        while (!isUnique && counter <= 999) {
            const formattedCounter = counter.toString().padStart(3, '0');
            code = `${baseCode}${formattedCounter}`;
            const existingTask = await this.task.findOne({ taskCode: code });
            if (!existingTask) {
                isUnique = true;
            } else {
                counter++;
            }

            if (!isUnique) {
                throw new Error(`Error generating the taskCode after several tries`);
            }
            return code;
        }
    }
}


