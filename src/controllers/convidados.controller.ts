import { Response } from 'express'
import { prisma } from "../../lib/prisma.js"
import { Convidado } from '../interface/convidado.interface.js'
import { AuthRequest } from '../middlewares/auth.middlewares.js'

export async function Criar(req: AuthRequest, res: Response) {
    const { nome, sobrenome, cpf, telefone, email }: Convidado = req.body

    if (!nome || !sobrenome || !cpf || !telefone || !email) {
        res.status(400).json({ error: "todos os dados são obrigatorios" })
        return
    }

    try {
        const convidado = await prisma.convidados.create({
            data: {
                nome, sobrenome, cpf, telefone, email,
                criadoPor: req.userId! // registra quem cadastrou o convidado
            },
            select: { id: true, nome: true, sobrenome: true }
        })
        res.status(201).json(convidado)
    } catch (error) {
        res.status(400).json({ error: "erro ao criar convidado" })
    }
}



export async function Listagem(req: AuthRequest, res: Response) {
    try {
        const list = await prisma.convidados.findMany({
            select: {
                id: true,
                nome: true,
                sobrenome: true,
                email: true,
                telefone: true,
                status: true,
                criadoPor: true
            }
        })

        res.status(200).json(list)
    } catch {
        res.status(400).json({ error: "nenhum convidado encontrado" })
    }
}



export async function Busca(req: AuthRequest, res: Response) {
    const { id } = req.params
    if (!id) {
        res.status(400).json({ error: "ID do convidado não fornecido" })
        return
    }

    try {
        const convidado = await prisma.convidados.findUnique({
            where: { id: Number(id) }
        })
        if (!convidado) {
            res.status(404).json({ error: "convidado não encontrado" })
            return
        }
        res.status(200).json(convidado) // era 400 no caminho de sucesso
    } catch {
        res.status(400).json({ error: "convidado não encontrado" })
    }
}



export async function Editar(req: AuthRequest, res: Response) {
    const { id } = req.params
    if (!id) {
        res.status(400).json({ error: "insira todos os dados" })
        return
    }

    const { nome, sobrenome, cpf, telefone, email } = req.body

    const convidado = await prisma.convidados.findFirst({
        where: { id: +id }
    })
    if (!convidado) {
        res.status(404).json({ error: "convidado não encontrado" })
        return
    }

    try {
        const editado = await prisma.convidados.update({
            where: { id: +id },
            data: { nome, sobrenome, cpf, telefone, email }
        })
        res.status(200).json(editado)
    } catch (error) {
        res.status(400).json({ error: "Erro ao atualizar" })
    }
}



// Rota de check-in (spec: PATCH /convidados/:id/checkin)
export async function MudarTipo(req: AuthRequest, res: Response) {
    const { id } = req.params
    if (!id) {
        res.status(400).json({ error: "insira todos os dados" })
        return
    }

    const { status } = req.body
    if (!status) {
        res.status(400).json({ error: "insira todos os dados" })
        return
    }

    // BUG antigo: buscava em prisma.user em vez de prisma.convidados
    const convidado = await prisma.convidados.findUnique({ where: { id: Number(id) } })
    if (!convidado) {
        res.status(404).json({ error: "Convidado não encontrado" })
        return
    }

    try {
        const editado = await prisma.convidados.update({
            where: { id: +id },
            data: { status }
        })
        res.status(200).json(editado)
    } catch (error) {
        res.status(400).json({ error: "Erro ao atualizar" })
    }
}



export async function Deletar(req: AuthRequest, res: Response) {
    const { id } = req.params
    if (!id) {
        res.status(400).json({ error: "convidado não encontrado" })
        return
    }

    const convidado = await prisma.convidados.findFirst({
        where: { id: +id }
    })
    if (!convidado) {
        res.status(404).json({ error: "convidado não encontrado" })
        return
    }

    try {
        await prisma.convidados.delete({
            where: { id: +id }
        })
        res.status(200).json({ message: `convidado deletado ${id}` })
    } catch {
        res.status(400).json({ error: "erro ao deletar convidado" })
    }
}