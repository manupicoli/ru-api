import { Request, Response } from "express";
import { Reservation } from "../entities/reservation";
import { IReservationService } from "../services/reservation/reservationServiceType";
import { IUserService } from "../services/user/userServiceType";
import { toUser } from "../utils/mappers/userMappers";

export class ReservationController{
    private reservationService: IReservationService;
    private userService: IUserService;

    constructor(reservationService: IReservationService, userService: IUserService) {
        this.reservationService = reservationService;
        this.userService = userService;
    }

    create = async(req: Request, res: Response): Promise<void> => {
        try {
            const userId = parseInt(req.params.userId);
            const user = await this.userService.getById(userId);
            const entityUser = toUser(user);

            const reservationDate = req.body.reservationDate;
            const mealTime = req.body.mealTime;
            
            if (!user) {
                res.status(404).json({ message: "User not found" });
            }

            const reservation = new Reservation();
            reservation.user = entityUser;
            reservation.reservationDate = reservationDate;
            reservation.mealTime = mealTime;

            const newReservation = await this.reservationService.create(reservation);
            res.status(201).json({ message: "Reservation created", reservation: newReservation });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    getAll = async(req: Request, res: Response): Promise<void> => {
        try{
            const reservations = await this.reservationService.getAll();
            reservations ? res.status(200).json(reservations) : res.status(404).json({message: 'Reservation not found'});
        } catch (error){
            console.log(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    getById = async(req: Request, res: Response): Promise<void> => {
        try{
            const reservation = await this.reservationService.getById(parseInt(req.params.id));
            reservation ? res.status(200).json(reservation) : res.status(404).json({message: 'Reservation not found'});
        } catch (error){
            console.log(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    update = async(req: Request, res:Response): Promise<void> => {
        try{
            const updatedReservation = await this.reservationService.update(parseInt(req.params.id), req.body);
            updatedReservation ? res.status(200).json(updatedReservation) : res.status(404).json({ message: 'Reservation not Found'});
        } catch (error){
            console.log(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    delete = async(req: Request, res: Response): Promise<void> => {
        try{
            const deleteReservation = await this.reservationService.delete(parseInt(req.params.id));
            deleteReservation ? res.status(204).json({ message: 'Reservation deleted'}) : res.status(404).json({ message: 'Reservation not found'});
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}