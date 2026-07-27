import { Router } from "express"
import { registerUser, login, Lista, Procurar, Modificar, Remover } from "../controllers/user.controller.js"
import { Authmiddleware } from "../middlewares/auth.middlewares.js"
import { AdminMiddleware } from "../middlewares/authAdmin.middlewares.js"

const router = Router()

// POST /login (spec)
router.post("/login", login)

// POST /usuarios -> só Admin pode cadastrar (recepcionistas ou outros admins)
router.post("/usuarios", Authmiddleware, AdminMiddleware, registerUser)
router.get("/usuarios", Authmiddleware, Lista)
router.get("/usuarios/:id", Authmiddleware, Procurar)
router.patch("/usuarios/:id", Authmiddleware, AdminMiddleware, Modificar)
router.delete("/usuarios/:id", Authmiddleware, AdminMiddleware, Remover)

export default router