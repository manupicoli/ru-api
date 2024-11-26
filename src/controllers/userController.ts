import { Request, Response } from "express";
import { UserDTO } from "../dtos/userDTO";
import { IUserService } from "../services/user/userServiceType";

export class UserController{
    private userService: IUserService;

    constructor(userService: IUserService) {
        this.userService = userService;
    }

    // create = async(req: Request, res: Response): Promise<void> => {
    //     try{
    //         const payload: UserDTO = req.body;
    //         const newUser = await this.userService.create(payload);

    //         res.status(201).json({message: "User created", newUser});
    //     } catch (error){
    //         console.log(error);
    //         res.status(500).json({ message: "Internal server error" });
    //     }
    // }

    getAll = async(req: Request, res: Response): Promise<void> => {
        try{
            const users = await this.userService.getAll();
            users ? res.status(200).json(users) : res.status(404).json({message: 'Users not found'});
        } catch (error){
            console.log(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    getById = async(req: Request, res: Response): Promise<void> => {
        try{
            const user = await this.userService.getById(parseInt(req.params.id));
            user ? res.status(200).json(user) : res.status(404).json({message: 'User not found'});
        } catch (error){
            console.log(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    getByEmail = async(req: Request, res: Response): Promise<void> => {
        try{
            const email = req.body.email;
            const user = await this.userService.getByEmail(email);
            user ? res.status(200).json(user) : res.status(404).json({message: 'User not found'});
        } catch (error){
            console.log(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    update = async(req: Request, res:Response): Promise<void> => {
        try{
            const updatedUser = await this.userService.update(parseInt(req.params.id), req.body);
            updatedUser ? res.status(200).json(updatedUser) : res.status(404).json({ message: 'User not Found'});
        } catch (error){
            console.log(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    delete = async(req: Request, res: Response): Promise<void> => {
        try{
            const deleteUser = await this.userService.delete(parseInt(req.params.id));
            deleteUser ? res.status(204).json({ message: 'User deleted'}) : res.status(404).json({ message: 'User not found'});
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    getUserReservations = async(req: Request, res: Response): Promise<void> => {
        try{
            const userReservation = await this.userService.getUserReservations(parseInt(req.params.id));
            userReservation ? res.status(200).json(userReservation) : res.status(404).json({message : 'User does not have reservations'});
        } catch (error){
            console.log(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}