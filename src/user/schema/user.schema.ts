import { Prop, Schema } from "@nestjs/mongoose";

@Schema()
export class UserEntity {
    @Prop()
    user_id: string;
    @Prop()
    user_name: string;
    @Prop()
    email: string;
}