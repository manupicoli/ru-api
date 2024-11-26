import { DataSource, Repository } from "typeorm"
import { Reservation } from "../../entities/reservation"
import { ReservationDTO } from "../../dtos/reservationDTO"
import { IReservationRepository } from "./reservationRepositoryType"

export class ReservationRepository implements IReservationRepository{
    private repository: Repository<Reservation>

    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository(Reservation)
    }

    async create(reservation: ReservationDTO): Promise<Reservation> {
        const newReservation = this.repository.create(reservation);
        return await this.repository.save(newReservation);
    }

    async getAll(): Promise<Reservation[]> {
        const reservations = await this.repository.find({
            relations: {
                user: true
            },
        });
        if(!reservations) {
            throw new Error('Reservations not found');
        }

        return reservations;
    }

    async getById(id: number): Promise<Reservation> {
        const reservation = await this.repository.findOne({ 
            where: { id },
            relations: {
                user: true
            }
        });
        if(!reservation){
            throw new Error('Reservation not found');
        }

        return reservation;
    }

    async update(id: number, payload: Partial<ReservationDTO>): Promise<Reservation> {
        const reservationToUpdate = await this.getById(id);
        if(reservationToUpdate) this.repository.merge(reservationToUpdate, payload);
        if(reservationToUpdate){
            return await this.repository.save(reservationToUpdate)
        } else {
            throw new Error('Reservation could not be updated');
        } 
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result?.affected ? result.affected > 0 : false;
    }
}