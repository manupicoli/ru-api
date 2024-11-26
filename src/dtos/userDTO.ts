import { User } from "../entities/user";
import { UserRole } from "../enums/userRoles";

export interface UserDTO extends Omit<User, "id">{
    id?: number,
    username?: string,
    email?: string,
    role?: UserRole
}