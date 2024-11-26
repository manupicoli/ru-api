import express from 'express'   
import { HealthcheckController } from '../../controllers/healthcheckController';

const healthcheck = new HealthcheckController();
const healthcheckRouter = express.Router()

healthcheckRouter.get('/healthcheck', healthcheck.get)

export default healthcheckRouter