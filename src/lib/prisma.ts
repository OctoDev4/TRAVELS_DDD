// Importações de Módulos
 import {env} from "../env";

; // Importa o módulo env para acessar as variáveis de ambiente
import { PrismaClient } from "@prisma/client"; // Importa o PrismaClient do pacote Prisma

// Criação de uma instância do PrismaClient
export const prisma = new PrismaClient({
    // Configura o PrismaClient com um logger opcional, dependendo do ambiente
    log: env.NODE_ENV === 'dev' ? ['query'] : [] // Se o ambiente for de desenvolvimento ('dev'), ativa o log para todas as consultas ('query'), caso contrário, deixa o log vazio
});