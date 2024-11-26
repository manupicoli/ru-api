import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { mealTime } from "../enums/mealTime";
import { User } from "./user";

@Entity('Reservations')
export class Reservation {
    @PrimaryGeneratedColumn()
    id?: number

    @ManyToOne(() => User, (user) => user.reservations)
    user?: User;

    @Column()
    reservationDate?: Date

    @Column()
    mealTime?: mealTime

    constructor(
        id?: number,
        user?: User,
        reservationDate?: Date,
        mealTime?: mealTime,
    ) {
        this.id = id
        this.user = user
        this.reservationDate = reservationDate
        this.mealTime = mealTime
    }
}