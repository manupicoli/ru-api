import { UserDTO } from "../../dtos/userDTO";
import { User } from "../../entities/user";

export function toUserDTO(user: User): UserDTO{
    return {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
    };
}

export function toUsersDTO(users: User[]): UserDTO[]{
    return users.map(user => ({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
    }));
}

export function toUser(user: UserDTO | undefined): User{
    return {
        id: user?.id,
        username: user?.username,
        email: user?.email,
        role: user?.role
    }
}

