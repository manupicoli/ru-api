import { Reservation } from "../entities/reservation";
import { mealTime } from "../enums/mealTime";
import { UserDTO } from "./userDTO";

export interface ReservationDTO extends Omit<Reservation, "id">{
    id?: number,
    user?: UserDTO,
    reservationDate?: Date,
    mealTime?: mealTime,
}