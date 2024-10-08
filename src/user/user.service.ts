import { Injectable } from '@nestjs/common';
import { UserEntity } from './schema/user.schema';
import axios from 'axios';

@Injectable()
export class UserService {
    constructor(){}

    async findUserById(userId : string):Promise<UserEntity> {
        
        const token = await this.getToken();
        const config = {
            method: 'get',
            url: `http://localhost:5050/user/${userId}`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        const user = new UserEntity();

        const response = await axios.request(config);
        user.user_id = response.data._id;
        user.user_name = response.data.userName;
        user.email = response.data.email;

        return user
    }

    async getToken() : Promise<string> {
        const username = "admin";
        const password = "admin";

        const body = JSON.stringify({
            "userName": username,
            "password": password
        });

        const config = {
            method: 'post',
            url: 'http://localhost:5050/auth',
            headers: {
                'Content-Type': 'application/json'
            },
            data : body
        }

        const response = await axios.request(config);
        const token = response.data.access_token;

        return token;
    }
}
