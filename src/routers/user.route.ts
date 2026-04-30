import { Router } from "express"
import { registerUser, login, Lista, Procurar, Modificar, Remover } from "../controllers/user.controller.js"
import { Authmiddleware } from "../middlewares/auth.middlewares.js"
import { AdminMiddleware } from "../middlewares/authAdmin.middlewares.js"

const router = Router()

router.post("/register", registerUser)
router.post("/login", login)
router.get("/users", Authmiddleware, Lista)
router.get("/user/:id", Authmiddleware, Procurar)
router.patch("/user/:id", Authmiddleware, AdminMiddleware, Modificar)
router.delete("/user/:id", Authmiddleware, AdminMiddleware, Remover)

export default router