import { UsersRepository } from "@/repositories/users-repository";
import { Prisma, User } from "@prisma/client";
import { randomUUID } from "node:crypto";

export class InMemoryUsersRepository implements UsersRepository {
    public items: User[] = [];

    // Método para criar um novo usuário
    async create(data: Prisma.UserUncheckedCreateInput): Promise<User> {
        const id = `user-${randomUUID()}`; // Gerando UUID com prefixo 'user-'
        const user: User = {
            id,
            name: data.name,
            email: data.email,
            password: data.password,
            phone: data.phone,
            jobRole: data.jobRole,
        };
        this.items.push(user); // Adiciona o novo usuário ao array de items
        return user; // Retorna o usuário criado
    }

    // Método para deletar um usuário
    async delete(data: User): Promise<void> {
        const userIndex = this.items.findIndex((item) => item.id === data.id);
        if (userIndex !== -1) {
            this.items.splice(userIndex, 1); // Remove o usuário do array se encontrado
        }
    }

    // Método para buscar um usuário pelo email
    async findByEmail(email: string): Promise<User | null> {
        const userEmail = this.items.find((user) => user.email === email);
        return userEmail || null; // Retorna o usuário encontrado ou null se não encontrado
    }

    // Método para buscar um usuário pelo ID
    async findById(id: string): Promise<User | null> {
        const user = this.items.find((user) => user.id === id);
        return user || null; // Retorna o usuário encontrado ou null se não encontrado
    }

    // Método para salvar (atualizar) um usuário
    async save(data: User): Promise<User> {
        const index = this.items.findIndex((user) => user.id === data.id);
        if (index === -1) {
            throw new Error(`User with id ${data.id} not found`);
        }
        this.items[index] = {
            ...this.items[index],  // Mantém as propriedades existentes do usuário no array
            ...data                 // Atualiza com as novas propriedades passadas como parâmetro
        };
        return this.items[index]; // Retorna o usuário atualizado
    }
}
