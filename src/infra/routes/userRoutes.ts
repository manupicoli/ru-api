import express from 'express'   
import { UserController } from '../../controllers/userController'
import { UserService } from '../../services/user/userService';
import { UserRepository } from '../../repositories/user/userRepository';
import { appDataSource } from '../../data-source';

const userRepository = new UserRepository(appDataSource);
const userService = new UserService(userRepository);
const userController = new UserController(userService);
const userRouter = express.Router()

userRouter.get('/users', userController.getAll)
userRouter.get('/user/:id', userController.getById)
userRouter.put('/user/:id', userController.update)
userRouter.delete('/user/:id', userController.delete)

userRouter.get('/user/:id/reservations', userController.getUserReservations)

export default userRouter