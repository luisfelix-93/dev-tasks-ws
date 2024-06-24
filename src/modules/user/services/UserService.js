const User = require('../model/User');
const {createPasswordHash} = require('../../../service/auth');


class UserService {

    async registerUser(userName, fullName, email, password) {
        try {
            // const encryptadePssword = await createPasswordHash(password);
            // const user = {userName, fullName, email, password : encryptadePssword}; 
            const user = {userName, fullName, email, password}
            const newUser = new User(user);
            await newUser.save();
            return newUser;
        } catch(error){
            console.error('Error: ', error);
            throw error;
        }
    }

    async getUsers() 
    {
    try {
        const user = User.find();
        if(!user) {
            throw 'Nenhum usuário encontrado!';
        }
        return user;
    } catch (error) {
        console.error('Error: ', error);
        throw  error;
    }
    }
    async getUserById(userId) {
        try {
          return await User.findById(userId);
        } catch (error) {
          throw error;
        }
    }
    
    async getUserByName(userName) {
        try {
          return await User.findOne({ userName });
        } catch (error) {
          throw error;
        }
    }

    async deleteUser(idUser) {
        try{
            return await User.deleteOne({_id : idUser});
        }catch(error){
            throw error;
        }
    }

}
module.exports = new UserService();