import { UserService } from "../services/user/userService";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { UserRole } from "../enums/userRoles";

export class LoginController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    registerUser = async (req: Request, res: Response): Promise<void> => {
        try{
            const { username, password, email } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const userDTO = {
                username: username,
                password: hashedPassword,
                email: email,
                role: UserRole.Consumer
            }

            const newUser = await this.userService.create(userDTO)

            res.status(201).json({ message: "User registered", newUser });
        } catch (error) {
            res.status(500).json({ message: "Internal server error", error });
        }
    }

    login = async (req: Request, res: Response): Promise<void> => { 
        try {
            const { email, password } = req.body;
            const user = await this.userService.getByEmail(email);
            
            if (user.password && await bcrypt.compare(password, user.password)) {
                const token = jwt.sign({ id: user.id } , "your_jwt_secret", {expiresIn: "1h"} );
                res.status(200).json({ message: "User logged in", token, user});
            } else {
                res.status(401).json({ message: "Invalid credentials" });
            }
        } catch (error) {
            res.status(500).json({ message: "Internal server error", error });
        }
    }
}