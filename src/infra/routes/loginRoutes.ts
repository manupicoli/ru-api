import express from 'express'
import { LoginController } from '../../controllers/loginController'
import { UserService } from '../../services/user/userService';
import { UserRepository } from '../../repositories/user/userRepository';
import { appDataSource } from '../../data-source';
const loginRouter = express.Router()

const userRepository = new UserRepository(appDataSource);
const userService = new UserService(userRepository);
const loginController = new LoginController(userService);

loginRouter.post('/login', loginController.login)
loginRouter.post('/signup', loginController.registerUser)

export default loginRouter