const UserService = require("../src/modules/user/services/UserService");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const {checkPassword} = require('../src/service/auth')


let mongoServer;
jest.setTimeout(10000);

beforeAll(async () => {

    mongoServer = await MongoMemoryServer.create();
    const mongouri = mongoServer.getUri();
    mongoose.connect(mongouri);
})

describe('UserService', () => {
    -describe('registerUser', () => {
        it('Should register a new user', async () => {
            const userData = {
                userName : "test",
                fullName : "Test Testov",
                email : "test@test.com",
                password : "test"
            }

            const newUser = await UserService.registerUser(userData.userName, userData.fullName, userData.email, userData.password);
            expect(newUser).toBeDefined();
            expect(newUser.userName).toBe(userData.userName);
            expect(newUser.fullName).toBe(userData.fullName);
            expect(newUser.password).toBe(userData.password);
            expect(newUser.email).toBe(userData.email);
        });

        
    });

    describe('getUserById', () => {
        it('Should get the user by hid id', async () => {
            const userData = {
                userName : "test",
                fullName : "Test Testov",
                email : "test@testE.com",
                password : "test"
            }

            const newUser = await UserService.registerUser(userData.userName, userData.fullName, userData.email, userData.password);
            const user = await UserService.getUserById(newUser._id);

            expect(user).toBeDefined();
            expect(user.userName).toBe(userData.userName);
            expect(user.fullName).toBe(userData.fullName);
            expect(user.password).toBe(userData.password);
            expect(user.email).toBe(userData.email);
        });
    });

    
})