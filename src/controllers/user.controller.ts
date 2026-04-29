import { Request, Response } from "express"
import { User, LoginUser, } from "../interface/user.interface.js"
import { prisma } from "../../lib/prisma.js"
import jwt from "jsonwebtoken"


export async function registerUser(req: Request, res: Response) {
    const {nome, email, senha}: User = req.body
    console.log(req.body)
    if(! nome || !email || !senha){
        res.status(400).json({ error: "todos os dados são obrigatorios" })
    }

    try {
        const user = await prisma.user.create({
            data: { nome, senha, email },
            select: { id: true }
        })
        console.log(user);
        res.status(200).json(user)
    } catch {
        res.status(400).json({ error: "erro ao criar usuario" })
    }
}


export async function login(req: Request, res: Response) {
    
    const { email, senha}: User = req.body
    console.log(req.body)
    if (!email || !senha) {
        res.status(400).json({ error: "email e senha são obrigatorios" })
    }

    const user = await prisma.convidados.findUnique({where:{email}})

    if(!user)
    
    
}