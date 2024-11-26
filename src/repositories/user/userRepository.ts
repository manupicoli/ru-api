import { DataSource, Repository } from "typeorm"
import { User } from "../../entities/user"
import { UserDTO } from "../../dtos/userDTO"
import { IUserRepository } from "./userRepositoryType"
import { Reservation } from "../../entities/reservation"


export class UserRepository implements IUserRepository{
    private repository: Repository<User>

    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository(User)
    }

    async create(user: UserDTO): Promise<User> {
        const newUser = this.repository.create(user);
        return this.repository.save(newUser);
    }

    async getAll(): Promise<User[]> {
        return await this.repository.find();
    }  

    async getById(id: number): Promise<User> {
        const user = await this.repository.findOneBy({ id });
        if(!user) {
            throw new Error('User not found');
        }
        return user;
    }

    async getByEmail(email: string): Promise<User> {
        const user = await this.repository.findOneBy({ email });
        if(!user){
            throw new Error('User not found');
        }

        return user;
    }

    async update(id: number, payload: Partial<UserDTO>): Promise<User> {
        const userToUpdate = await this.getById(id);
        if(userToUpdate) this.repository.merge(userToUpdate, payload);
        if(userToUpdate){
            return await this.repository.save(userToUpdate)
        } else {
            throw new Error('User could not be updated');
        } 
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result?.affected ? result.affected > 0 : false;
    }

    async getUserReservations(id: number): Promise<Reservation[]> {
        const userReservations = await this.repository.findOne({
            where: { id },
            relations: ['reservations', 'reservations.user']
        });

        if(!userReservations || !userReservations.reservations) {
            throw new Error('Reservations not found');
        }
        return userReservations.reservations;
    }
}