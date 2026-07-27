import { Router } from "express"
import { Criar, Listagem, Busca, Editar, MudarTipo, Deletar } from "../controllers/convidados.controller.js"
import { Authmiddleware } from "../middlewares/auth.middlewares.js"
import { AdminMiddleware } from "../middlewares/authAdmin.middlewares.js"

const router = Router()

// Admin e Recepcionista podem cadastrar/visualizar/editar/check-in
router.post("/", Authmiddleware, Criar)
router.get("/", Authmiddleware, Listagem)
router.get("/:id", Authmiddleware, Busca)
router.put("/:id", Authmiddleware, Editar)
router.patch("/:id/checkin", Authmiddleware, MudarTipo)

// Só Admin pode excluir convidados
router.delete("/:id", Authmiddleware, AdminMiddleware, Deletar)

export default router