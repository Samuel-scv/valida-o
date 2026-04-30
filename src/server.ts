import express from 'express'
import ConvidadoRouter from './routers/convidado.route.js'
import UserRouter from './routers/user.route.js'
const PORT = 3000
const app = express()

app.use(express.json());
app.use("/convidados", ConvidadoRouter)
app.use("/users", UserRouter)

app.listen(PORT, () => {
    console.log(`🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀funfando na ${PORT}`)
})

export default app