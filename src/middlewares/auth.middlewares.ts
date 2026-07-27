import { Request, Response, NextFunction } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import { Tipo } from "../../generated/prisma/enums.js"

export interface AuthRequest extends Request {
    userId?: number
    tipo?: Tipo
}

export function Authmiddleware(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ error: "token não fornecido" })
        return
    }

    const token = authHeader.split(" ")[1]!
    const secret = process.env.TOKEN

    if (!secret) {
        res.status(500).json({ error: "erro de configuração do servidor" })
        return
    }

    try {
        const validateToken = jwt.verify(token, secret) as JwtPayload
        req.userId = validateToken.userId
        req.tipo = validateToken.tipo
        next()
    } catch {
        res.status(401).json({ error: "token invalido" })
    }
}