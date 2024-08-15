import { UnidadeFederativa } from "./unidadefederativa"

export interface Promocao{
    id:number
    destino: string
    imagem: string
    preco: number
}
export interface Depoimento{
    id:number
    texto:string
    autor:string
    avatar:string
}

export interface User{
    nome:string
    nascimento:string
    cpf:string
    telefone:string
    email:string
    senha:string
    cidade:string
    estado: UnidadeFederativa
    genero: string
}