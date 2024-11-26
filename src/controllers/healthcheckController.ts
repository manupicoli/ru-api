import { Request, Response } from "express";
import { appDataSource } from "../data-source";

export class HealthcheckController {
    get = async (req: Request, res: Response) => {
        try {
            if(appDataSource.isInitialized) {
                await appDataSource.query('SELECT 1');
                return res.status(200).json({ message: "Sucesso" });
            }
            return res.status(500).json({ message: "Erro" });
        } catch (error) {
            console.error('Database connection error:', error);
            return false;
        }
    }
}