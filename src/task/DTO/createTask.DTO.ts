import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateTaskDTO {
    @IsNotEmpty({message: 'Task type can not be null'})
    @IsString()
    taskType: string;
    
    @IsString()
    @IsNotEmpty({message: 'You must add a title to your task'})
    taskTitle: string;

    @IsDate({message: 'Only date formatted'})
    dateStart: Date;

    @IsString()
    @IsNotEmpty({message: 'You must add a note to your task'})
    note: string;

    @IsString()
    @IsNotEmpty({message: 'Whos is the owner of your task'})
    owner_id: string;

    @IsString()
    manager_id: string;
}