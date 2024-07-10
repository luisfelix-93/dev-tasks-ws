const UserService = require('../services/UserService');

class UserController {
    async register(req, res) {
        try {
            const {userName, fullName, email, password} = req.body;
            const findUser = await UserService.getUserByName(userName);
            if(findUser){
                return res.status(409).json(
                    {
                        message : "User already exists",
                        data  : null
                    });
            }
            const user = await UserService.registerUser(userName, fullName, email, password);
            res.status(201).json(
                {
                    message : "User created successfully",
                    data: user
                }
        );
        } catch (error) {
            res.status(500).json({
                message : "An internal error occurred",
                data: `An internal error occurred, ${error}`
            });
        }
    };
    async index(req, res) {
        try{
            const {id} = req.params;
            const user = await UserService.getUserById(id);
            if(!user){
                return res.status(404).send("User not found");
            }
            return res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        } 
    };

    async user(req, res) {
        try{
            const users = await UserService.getUsers();
            if(!users){
                return res.status(404).send("User not found");
            }
            return res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async destroy(req, res) {
        try{
            const {id} = req.params;
            const user = await UserService.deleteUser({id});
            if (!user) {
                return res.status(404).send('User not found');
            }
            return res.status(202).send('User deleted successfully');
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};
module.exports = new UserController();
