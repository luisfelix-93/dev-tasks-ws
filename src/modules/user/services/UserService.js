const User = require('../model/User');

class UserService {
    async createUser(userName, password, fullName, email) {
   try {   
        const findUser = User.findOne({userName});
        if(userName) {
            return ('User already exist');
        }
        
        const newUser = {userName, password, fullName, email};
        await User.create(newUser);
        return newUser;
    } catch (error){
        throw error
    }
}
async getAllUsers() {
    try{
        const users=  await User.find();
        if(!user) {
            return ('Users not found!');
        }

        return user;
    } catch (error){
        throw  error;
    } 
}

async getUserById(idUser){
    try{
        const user = User.findById(idUser);
        if(!user) {
            return ('Users not found!');
        }
        return user;
    } catch (error){
        throw error;
    } 
}
}

module.exports = new UserService;
