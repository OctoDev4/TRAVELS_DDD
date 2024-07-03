// Importa o tipo de Environment do módulo vitest
import { Environment } from 'vitest';

// Importa a função randomUUID do módulo node:crypto
import { randomUUID } from "node:crypto";

// Importa o módulo dotenv para carregar as variáveis de ambiente de um arquivo .env
import "dotenv/config";

// Importa a função execSync do módulo node:child_process para executar comandos shell de forma síncrona
import { execSync } from 'node:child_process';
import {prisma} from "../../src/lib/prisma";

// Importa o objeto prisma para interagir com o ORM Prisma


// Função para gerar a URL do banco de dados com o esquema fornecido
function generateDatabaseUrl(schema: string) {
    // Verifica se a variável de ambiente DATABASE_URL está definida
    if (!process.env.DATABASE_URL) {
        // Lança um erro se a variável de ambiente DATABASE_URL não estiver definida
        throw new Error('please provide a DATABASE_URL environment variable');
    }

    // Parseia a URL do banco de dados
    const url = new URL(process.env.DATABASE_URL);

    // Define o esquema na URL do banco de dados
    url.searchParams.set('schema', schema);

    // Retorna a URL completa como string
    return url.toString();
}

// Exporta um objeto do tipo Environment
export default <Environment>{
    // Modo de transformação, neste caso 'ssr' (server-side rendering)
    transformMode: 'ssr',

    // Nome do ambiente, neste caso 'prisma'
    name: 'prisma',

    // Função de configuração do ambiente
    async setup() {
        // Gera um UUID aleatório para o esquema do banco de dados
        const schema = randomUUID();

        // Gera a URL do banco de dados com o esquema gerado
        const databaseURL = generateDatabaseUrl(schema);

        // Define a variável de ambiente DATABASE_URL com a URL do banco de dados gerada
        process.env.DATABASE_URL = databaseURL;

        // Executa o comando 'npx prisma migrate deploy' para aplicar as migrações do Prisma
        execSync('npx prisma migrate deploy');

        // Retorna um objeto com a função de teardown assíncrona
        return {
            async teardown() {
                // Remove o esquema do banco de dados e desconecta o Prisma
                await prisma.$executeRawUnsafe(
                    `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
                )

                await prisma.$disconnect()
            },
        };
    }
};