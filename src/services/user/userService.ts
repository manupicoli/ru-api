import { UserDTO } from "../../dtos/userDTO";
import { UserRole } from "../../enums/userRoles";
import { IUserRepository } from "../../repositories/user/userRepositoryType";
import { toReservationsDTO } from "../../utils/mappers/reservationMappers";
import { toUserDTO, toUsersDTO } from "../../utils/mappers/userMappers";
import { IUserService } from "./userServiceType";

export class UserService implements IUserService{
    userRepository: IUserRepository;

    constructor(userRepository: IUserRepository){
        this.userRepository = userRepository;
    }

    create = async (user: UserDTO) => {
        const newUser = await this.userRepository.create(user);
        return toUserDTO(newUser);
    };

    getAll = async() => {
        const users = await this.userRepository.getAll();
        return toUsersDTO(users);
    };

    getById = async (id: number) => {
        const user = await this.userRepository.getById(id)
        return toUserDTO(user);
    };

    getByEmail = async (email: string) => {
        return await this.userRepository.getByEmail(email);
    };

    update = async (id: number, payload: Partial<UserDTO>) => {
        const updatedUser = await this.userRepository.update(id, payload);
        return toUserDTO(updatedUser);
    };

    delete = async (id: number) => {
        return this.userRepository.delete(id);
    };

    getUserReservations = async (id: number) => {
        const userReservations = await this.userRepository.getUserReservations(id);
        return toReservationsDTO(userReservations);
    };

}