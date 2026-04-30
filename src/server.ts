import express from 'express'
import router from './routers/user.route.js'
const PORT = 3000
const app = express()

app.use(express.json())
app.use(router)

app.listen(PORT, () => {
    console.log(`🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀funfando na ${PORT}`)
})

export default app