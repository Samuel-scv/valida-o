import { Router } from "express"
import { registerUser, login } from "../controllers/user.controller.js"
import { Busca, Deletar, Listagem, Criar, Editar } from "../controllers/convidados.controller.js"
import { Authmiddleware } from "../middlewares/auth.middlewares.js"
import { AdminMiddleware } from "../middlewares/authAdmin.middlewares.js"

const router = Router()
router.post("/register", registerUser)
router.post("/login", login)
router.post("/CriarConvidado", Authmiddleware, AdminMiddleware, Criar)
router.get("/convidados", Authmiddleware, Listagem)
router.get("/convidado/:id", Authmiddleware, Busca)
router.patch("/convidado/:id", Authmiddleware, AdminMiddleware, Editar)
router.delete("/convidado/:id", Authmiddleware, AdminMiddleware, Deletar)

export default router
