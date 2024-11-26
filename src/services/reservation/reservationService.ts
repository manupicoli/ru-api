import { ReservationDTO } from "../../dtos/reservationDTO";
import { IReservationRepository } from "../../repositories/reservation/reservationRepositoryType";
import { toReservationDTO, toReservationsDTO } from "../../utils/mappers/reservationMappers";
import { IReservationService } from "./reservationServiceType";

export class ReservationService implements IReservationService{
    reservationRepository: IReservationRepository;

    constructor(reservationRepository: IReservationRepository){
        this.reservationRepository = reservationRepository;
    }

    create = async (reservation: ReservationDTO) => {
        const newReservation = await this.reservationRepository.create(reservation);
        return toReservationDTO(newReservation);
    };

    getAll = async() => {
        const allReservation = await this.reservationRepository.getAll();
        return toReservationsDTO(allReservation);
    };

    getById = async (id: number) => {
        const reservation = await this.reservationRepository.getById(id);
        return toReservationDTO(reservation);
    };

    update = async (id: number, payload: Partial<ReservationDTO>) => {
        const updatedReservation = await this.reservationRepository.update(id, payload);
        return toReservationDTO(updatedReservation);
    };

    delete = async (id: number) => {
        return this.reservationRepository.delete(id);
    };


}