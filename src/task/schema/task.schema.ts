import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { UserEntity } from "src/user/schema/user.schema";

export type TaskDocument = Task & Document;

Schema()
export class Task {
    @Prop({required: true })
    taskCode: string;
    @Prop({required: true, enum:['dev', 'arch', 'database', 'test', 'review', 'implementation']})
    taskType: string;
    @Prop({required: true})
    taskTitle: string;
    @Prop({required: true})
    dateCreated: Date;
    @Prop()
    dateStart: Date;
    @Prop({default: null})
    dateEnd: Date;
    @Prop({required: true, enum: ['backlog', 'doing', 'review', 'onDeployment', 'done']})
    status: string;
    @Prop({required: true, ref: 'UserEntity'})
    owner_id: UserEntity;
    @Prop({required: true, ref: 'UserEntity'})
    manager_id: UserEntity;

}

export const TaskSchema = SchemaFactory.createForClass(Task)
