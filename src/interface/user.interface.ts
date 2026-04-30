import { Tipo } from "../../generated/prisma/enums.js"

export interface User{
    nome:string
    email:string
    senha:string
    tipo:Tipo
}

export interface LoginUser{
    email:string
    senha:string
}

