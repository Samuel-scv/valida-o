import { Request, Response } from "express"
import { User, LoginUser } from "../interface/user.interface.js"
import { prisma } from "../../lib/prisma.js"
import jwt from 'jsonwebtoken'

// Cadastro de usuário (recepcionista/admin). Protegido no router: só admin acessa.
export async function registerUser(req: Request, res: Response) {
    const { nome, email, senha, tipo }: User = req.body
    if (!nome || !email || !senha || !tipo) {
        res.status(400).json({ error: "todos os dados são obrigatorios" })
        return // faltava esse return: sem ele, seguia tentando criar o usuário mesmo faltando dados
    }

    try {
        const user = await prisma.user.create({
            data: { nome, senha, email, tipo },
            select: { id: true, nome: true, email: true, tipo: true }
        })
        res.status(201).json(user)
    } catch {
        res.status(400).json({ error: "erro ao criar usuario" })
    }
}



export async function login(req: Request, res: Response) {
    const { email, senha }: LoginUser = req.body
    if (!email || !senha) {
        res.status(400).json({ error: "email e senha são obrigatorios" })
        return // faltava esse return
    }

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user || (user.senha !== senha)) {
        res.status(400).json({ error: "Credenciais inválidas" })
        return
    }

    const token = jwt.sign(
    { userId: user.id, tipo: user.tipo },
    process.env.TOKEN!,
    { expiresIn: "1h" }
)
    res.status(200).json({ token })
}



export async function Lista(req: Request, res: Response) {
    try {
        const list = await prisma.user.findMany({
            select: { id: true, nome: true, email: true, tipo: true }
        })
        res.status(200).json(list)
    } catch {
        res.status(400).json({ error: "nenhum usuario encontrado" })
    }
}



export async function Procurar(req: Request, res: Response) {
    const { id } = req.params
    if (!id) {
        res.status(400).json({ error: "ID do usuario não fornecido" })
        return
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: Number(id) },
            select: { id: true, nome: true, email: true, tipo: true }
        })
        if (!user) {
            res.status(404).json({ error: "usuario não encontrado" })
            return
        }
        res.status(200).json(user) // era 400 no caminho de sucesso
    } catch {
        res.status(400).json({ error: "usuario não encontrado" })
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
        res.status(404).json({ error: "Usuario não encontrado" })
        return
    }

    try {
        const editado = await prisma.user.update({
            where: { id: +id },
            data: { nome, email, senha }
        })
        res.status(200).json(editado)
    } catch (error) {
        res.status(400).json({ error: "Erro ao atualizar" })
    }
}



export async function Remover(req: Request, res: Response) {
    const { id } = req.params
    if (!id) {
        res.status(400).json({ error: "usuario não encontrado" })
        return
    }

    const user = await prisma.user.findFirst({
        where: { id: +id }
    })
    if (!user) {
        res.status(404).json({ error: "usuario não encontrado" })
        return
    }

    try {
        // BUG antigo: chamava prisma.convidados.delete aqui, apagando a tabela errada
        await prisma.user.delete({
            where: { id: +id }
        })
        res.status(200).json({ message: `usuario deletado ${id}` })
    } catch {
        res.status(400).json({ error: "erro ao deletar usuario" })
    }
}