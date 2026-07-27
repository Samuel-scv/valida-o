import { Request, Response, NextFunction } from 'express'
import { AuthRequest } from './auth.middlewares.js'

export function AdminMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
    if (req.tipo !== "admin") {
        // 403 Forbidden é o status correto (304 é "Not Modified", não tem nada a ver com permissão)
        res.status(403).json({ error: "acesso restrito a administradores" })
        return // <- ESSENCIAL: sem isso, next() era chamado mesmo quando a checagem falhava
    }
    next()
}