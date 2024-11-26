import { Reservation } from "../../entities/reservation";
import { User } from "../../entities/user";

export interface IUserRepository {
    create: (user: User) => Promise<User>;
    getAll: () => Promise<User[]>;
    getById: (id: number) => Promise<User>;
    getByEmail: (email: string) => Promise<User>;
    update: (id: number, payload: Partial<User>) => Promise<User>;
    delete: (id: number) => Promise<boolean>;
    getUserReservations: (id: number) => Promise<Reservation[]>;
}