import { Request, Response } from "express"
import { User, LoginUser, } from "../interface/user.interface.js"
import { prisma } from "../../lib/prisma.js"
import jwt from 'jsonwebtoken'


export async function registerUser(req: Request, res: Response) {
    const { nome, email, senha, tipo }: User = req.body
    console.log(req.body)
    if (!nome || !email || !senha || !tipo) {
        res.status(400).json({ error: "todos os dados são obrigatorios" })
    }


    try {
        const user = await prisma.user.create({
            data: { nome, senha, email, tipo },
            select: { id: true }
        })
        console.log(user);
        res.status(200).json(user)
    } catch {
        res.status(400).json({ error: "erro ao criar usuario" })
    }
}



export async function login(req: Request, res: Response) {

    const { email, senha }: LoginUser = req.body
    console.log(req.body)
    if (!email || !senha) {
        res.status(400).json({ error: "email e senha são obrigatorios" })
    }

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user || (user.senha !== senha)) {
        res.status(400).json({ error: "Cresenciais inválidas" })
        return
    }

    const token = jwt.sign(
        {
            userId: user.id,
            tipo: user.tipo
        },
        "algo",
        { expiresIn: "1h" }
    )
    res.status(200).json({ token })
}



export async function Lista(req: Request, res: Response) {
    try {
        const list = await prisma.user.findMany({
            select: {
                id: true,
                nome: true,
                email: true,
                tipo: true
            }
        })

        res.status(200).json(list)
    } catch {
        res.status(400).json({ error: "nenhum convidado encontrado" })
    }
}



export async function Procurar(req: Request, res: Response) {
    const { id } = req.params
    if (!id) {
        res.status(400).json({ error: "ID do convidado não fornecido" })
        return
    }

    try {
        const user = await prisma.user.findMany({
            where: { id: Number(id) }
        })
        res.status(400).json(user)
    } catch {
        res.status(400).json({ error: "convidado não encontrado" })
    }
}



export async function Modificar(req: Request, res: Response) {
    const { id } = req.params
    if (!id) {
        res.status(400).json({ error: "insira todos os dados" })
        return
    }

    const { nome, email, senha } = req.body
    if (!nome || !email || !senha) {
        res.status(400).json({ error: "insira todos os dados" })
        return
    }

    const user = await prisma.user.findUnique({ where: { id: Number(id) } })
    if (!user) {
        res.status(400).json({ error: "Usuario não encontrado" })
        return
    }

    try {
        const editado = await prisma.user.update({
            where: { id: +id },
            data: { nome, email, senha }
        })
        res.status(200).json(editado)
    } catch (error) {
        res.status(400).json({ erro: "Erro ao atualizar" });
    }
}



export async function Remover(req: Request, res: Response) {
    const { id } = req.params
    if (!id) {
        res.status(400).json({ error: "convidado não encontrado" })
        return
    }

    const user = await prisma.user.findFirst({
        where: {
            id: +id
        }
    })
    if (!user) {
        res.status(400).json({ error: "convidado não encontrado" })
        return
    }

    try {
        await prisma.convidados.delete({
            where: { id: +id }
        })
        res.status(200).json({ message: `convidado deletado ${id}` })
    } catch {
        res.status(400).json({ error: "erro ao deletar usuario" })
    }
}
