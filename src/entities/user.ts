import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "../enums/userRoles";
import { Reservation } from "./reservation";

@Entity('Users')
export class User {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    username?: string

    @Column()
    email?: string

    @Column()
    role?: UserRole

    @Column()
    password?: string

    @OneToMany(() => Reservation, (reservation) => reservation.user)
    reservations?: Reservation[]

    constructor(
        id?: number,
        username?: string,
        email?: string,
        role?: UserRole,
        password?: string
    ) {
        this.id = id
        this.username = username
        this.email = email
        this.password = password
        this.role = role
    }
}