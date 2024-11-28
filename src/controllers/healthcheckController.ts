import { Request, Response } from "express";
import { appDataSource } from "../data-source";

export class HealthcheckController {
    get = async (req: Request, res: Response) => {
        const start = process.hrtime();
        try {
            if(appDataSource.isInitialized) {
                await appDataSource.query('SELECT 1');
                const uptime = process.uptime();
                const memoryUsage = process.memoryUsage();
                const cpuUsage = process.cpuUsage();
                const responseTime = process.hrtime(start);

                return res.status(200).json({ 
                    message: "Sucesso",
                    uptime: uptime,
                    memoryUsage: memoryUsage,
                    cpuUsage: cpuUsage,
                    responseTime: responseTime,
                    timestamp: new Date().toISOString()
                });
            }
            return res.status(500).json({ message: "Erro" });
        } catch (error) {
            console.error('Database connection error:', error);
            return false;
        }
    }
}