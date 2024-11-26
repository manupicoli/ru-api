import { ReservationDTO } from "../../dtos/reservationDTO";
import { UserDTO } from "../../dtos/userDTO";
import { User } from "../../entities/user";
import { IUserRepository } from "../../repositories/user/userRepositoryType";

export interface IUserService{
    userRepository: IUserRepository;
    
    create: (user: UserDTO) => Promise<UserDTO>;
    getAll: () => Promise<UserDTO[]>;
    getById: (id: number) => Promise<UserDTO>;
    getByEmail: (email: string) => Promise<User>;
    update: (id: number, payload: Partial<UserDTO>) => Promise<UserDTO>;
    delete: (id: number) => Promise<boolean>;
    getUserReservations: (id: number) => Promise<ReservationDTO[]>;
}