import express from 'express'
import { ReservationController } from '../../controllers/reservationController';
import { ReservationService } from '../../services/reservation/reservationService';
import { appDataSource } from '../../data-source';
import { ReservationRepository } from '../../repositories/reservation/reservationRepository';
import { UserRepository } from '../../repositories/user/userRepository';
import { UserService } from '../../services/user/userService';

const userRepository = new UserRepository(appDataSource);
const userService = new UserService(userRepository);

const reservationRepository = new ReservationRepository(appDataSource);
const reservationService = new ReservationService(reservationRepository);
const reservationController = new ReservationController(reservationService, userService);
const reservationRouter = express.Router()

reservationRouter.post('/reservation/:userId', reservationController.create)
reservationRouter.get('/reservations', reservationController.getAll)
reservationRouter.get('/reservation/:id', reservationController.getById)
reservationRouter.put('/reservation/:id', reservationController.update)
reservationRouter.delete('/reservation/:id', reservationController.delete)

export default reservationRouter