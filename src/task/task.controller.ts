import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDTO } from './DTO/createTask.DTO';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService : TaskService){}

    @Post()
    async create(@Body() taskDTO : CreateTaskDTO) {
        return await this.taskService.register(taskDTO);
    }

    @Get()
    async getAll() {
        return await this.taskService.findTasks();
    }

    @Get('user/:id')
    async getTaskByOwner(@Param('id') id : string) {
        return await this.taskService.findTaskByCode(id);
    }

    @Get('taskCode?=:codeTask')
    async getTaskByCode(@Param('codeTask') codeTask : string) {
        return await this.taskService.findTaskByCode(codeTask)
    }

    @Put('taskCode?=:codeTask')
    async updateTaskByStatus(@Param('codeTask') codeTask : string, @Body() status : string) {
        return await this.taskService.taskUpdate(codeTask, status);
    }

    @Put('taskCode?=:codeTask')
    async updateOwnerTask(@Param('codeTask') codeTask : string, @Body() owner_id : string) {
        return await this.taskService.updateOwner(codeTask, owner_id);
    }

    
    @Put('taskCode?=:codeTask')
    async updateManagerTask(@Param('codeTask') codeTask : string, @Body() manager_id : string) {
        return await this.taskService.updateManager(codeTask, manager_id);
    }

    @Delete('taskCode?=:codeTask')
    async deleteTask(codeTask : string) {
        return await this.taskService.deleteTask(codeTask);
    }

}
