import { Request, Response } from 'express'
import { prisma } from "../../lib/prisma.js"
import { Convidado } from '../interface/convidado.interface.js'


export async function Criar(req: Request, res: Response) {
    const { nome, sobrenome, cpf, telefone, email }: Convidado = req.body
    console.log(req.body)

    if (!nome || !sobrenome || !cpf || !telefone || !email) {
        res.status(400).json({ error: "todos os dados são obrigatorios" })
        return
    }

    try {
        const convidado = await prisma.convidados.create({
            data: { nome, sobrenome, cpf, telefone, email },
            select: { id: true, nome: true, sobrenome: true }
        })
        res.status(200).json(convidado)
    } catch { res.status(400).json({ error: "erro ao criar convidado" }) }
}


export async function Listagem(req: Request, res: Response) {
    try {
        const list = await prisma.convidados.findMany({
            select: {
                id: true,
                nome: true,
                sobrenome: true
            }
        })

        res.status(200).json(list)
    } catch {
        res.status(400).json({ error: "nenhum convidado encontrado" })
    }
}


export async function Busca(req: Request, res: Response) {
    const { id } = req.params
    if (!id) {
        res.status(400).json({ error: "insira todos os dados" })
        return
    }

    try {
        const convidado = await prisma.convidados.findMany({
            where: { id: Number(id) }
        })
        res.status(400).json(convidado)
    } catch {
        res.status(400).json({ error: "convidado não encontrado" })
    }
}


export async function Editar(req: Request, res: Response) {
    const { id } = req.params
    if (!id) {
        res.status(400).json({ error: "insira todos os dados" })
        return
    }

    const { nome, sobrenome, cpf, telefone, email} = req.body
    if (!nome || !sobrenome || !cpf || !telefone || !email) {
       res.status(400).json({ error: "todos os dados são obrigatorios" })
       return
    }

    const convidado = await prisma.convidados.findFirst({
        where: { id: +id }
    })
    if (!convidado) {
        res.status(400).json({ error: "convidado não encontrado" })
        return
    }

    try{
    const editado = await prisma.convidados.update({
        where: { id: +id },
        data: { nome, sobrenome, cpf, telefone, email, }
    })
    res.status(200).json(editado)
    } catch (error) {
        res.status(400).json({ erro: "Erro ao atualizar"  });
    }
}


export async function Deletar(req: Request, res: Response) {
    const { id } = req.params
    if (!id) {
        res.status(400).json({ error: "insira todos os dados" })
        return
    }

    const convidado = await prisma.convidados.findFirst({
        where: {
            id: +id
        }
    })
    if (!convidado) {
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
