import express, {Application} from "express"
import cors from "cors"
import userRouter from "./infra/routes/userRoutes"
import healthcheckRouter from "./infra/routes/healtcheckRoute"
import reservationRouter from "./infra/routes/reservationRoutes"
import menuRouter from "./infra/routes/menuRoutes"
import itensRouter from "./infra/routes/itensRoutes"
import loginRouter from "./infra/routes/loginRoutes"

const app: Application = express()
app.use(express.json())
app.use(cors())

app.use("/webmob", healthcheckRouter)
app.use("/webmob", userRouter)
app.use("/webmob", reservationRouter)
app.use("/webmob", menuRouter)
app.use("/webmob", itensRouter)
app.use("/webmob", loginRouter)

export default app