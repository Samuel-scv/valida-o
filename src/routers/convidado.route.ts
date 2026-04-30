import { Router } from "express"
import { Criar, Listagem, Busca, Editar, MudarTipo, Deletar } from "../controllers/convidados.controller.js"
import { Authmiddleware } from "../middlewares/auth.middlewares.js"
import { AdminMiddleware } from "../middlewares/authAdmin.middlewares.js"

const router = Router()

router.post("/CriarConvidado", Authmiddleware, AdminMiddleware, Criar)
router.get("/convidados", Authmiddleware, Listagem)
router.get("/convidado/:id", Authmiddleware, Busca)
router.patch("/convidado/:id", Authmiddleware, AdminMiddleware, Editar)
router.patch("/convidado/tipo/:id", Authmiddleware, MudarTipo)
router.delete("/convidado/:id", Authmiddleware, AdminMiddleware, Deletar)

export default router
