import { UsersRepository } from "@/repositories/users-repository";
import { prisma } from "@/lib/prisma";
import { Prisma, User } from '@prisma/client';

export class PrismaUsersRepository implements UsersRepository {

    async create(data: Prisma.UserUncheckedCreateInput): Promise<User> {
        const user = await prisma.user.create({
            data,
        });
        return user;
    }

    async delete(data: User): Promise<void> {
        await prisma.user.delete({
            where: {
                id: data.id
            }
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findFirst({
            where: {
                email
            }
        });
        return user;
    }

    async findById(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { id }
        });
        return user;
    }


    async save(data: User) {
        const updatedUser = await prisma.user.update({
            where:
                {
                    id: data.id
                },
            data,
        })

        return updatedUser
    }
}
