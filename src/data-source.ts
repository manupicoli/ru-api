import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.development";
dotenv.config({ path: envFile });

export const appDataSource = new DataSource({
    type: "postgres",
    ...(process.env.NODE_ENV === "production"
        ? { url: process.env.DATABASE_URL }
        : {
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT || "5432"),
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            }),
    synchronize: true,
    logging: false,
    entities: [__dirname+"/entities/*.{js,ts}"],
    migrations: [],
    subscribers: [],
});
