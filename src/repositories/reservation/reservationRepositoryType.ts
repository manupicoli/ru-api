import { ReservationDTO } from "../../dtos/reservationDTO"
import { Reservation } from "../../entities/reservation";

export interface IReservationRepository{
    create: (reservation: ReservationDTO) => Promise<Reservation>;
    getAll: () => Promise<Reservation[]>;
    getById: (id: number) => Promise<Reservation>;
    update: (id: number, payload: Partial<ReservationDTO>) => Promise<Reservation>;
    delete: (id: number) => Promise<boolean>;
}