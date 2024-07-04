import { UsersRepository } from '@/repositories/users-repository';
import { Prisma, User } from '@prisma/client';
import { randomUUID } from 'node:crypto';

export class InMemoryUsersRepository implements UsersRepository {
    public items: User[] = [];

    async create(data: Prisma.UserUncheckedCreateInput): Promise<User> {
        const newUser: User = {
            ...data,
            id: randomUUID(),
        };
        this.items.push(newUser);
        return newUser;
    }

    async delete(data: User) {
        const index = this.items.findIndex(u => u.id === data.id);
        if (index !== -1) {
            this.items.splice(index, 1);
        }
        
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = this.items.find(u => u.email === email);
        return user || null;
    }

    async findById(id: string): Promise<User | null> {
        const user = this.items.find(u => u.id === id);
        return user || null;
    }

    async save(updatedUser: User) {
        const index = this.items.findIndex(item => item.id === updatedUser.id);
        if (index ===0){
            this.items[index] = updatedUser
        }
        return updatedUser


    }
}
