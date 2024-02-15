const userService = require('../services/UserService');

class UserController {
    async create(req, res) {
       const {userName, password, fullName, email} = req.body;
       try{
        await userService.create({userName, password, fullName, email});
        return res.status(201).json({message: 'Usuário criado com sucesso!'})
       } catch(error) {
        return res.status(500).json({
            message :  'Internal Server Error' ,
            error: error,      
        });
       }
    }

    async index(res) {
        try{
            const user = await userService.getAllUsers();
            return res.status(200).json(user);
        } catch(error) {
            return res.status(500).json({
                message :  'Internal Server Error',
                error: error,      
            });
        }
    }

    async userById(req, res) {
        const idUser = req.params;
        try{
            const user = await userService.getUserById(idUser);
            return  res.status(200).json(user);
        } catch(error) {
            return res.status(500).json({
                message :  'Internal Server Error',
                error: error,      
            });
        }
    }
}
module.exports = new UserController()