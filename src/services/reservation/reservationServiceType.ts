import { ReservationDTO } from "../../dtos/reservationDTO";
import { IReservationRepository } from "../../repositories/reservation/reservationRepositoryType";

export interface IReservationService{
    reservationRepository: IReservationRepository;

    create: (reservation: ReservationDTO) => Promise<ReservationDTO>;
    getAll: () => Promise<ReservationDTO[]>;
    getById: (id: number) => Promise<ReservationDTO>;
    update: (id: number, payload: Partial<ReservationDTO>) => Promise<ReservationDTO>;
    delete: (id: number) => Promise<boolean>;
}