import {PrismaUsersRepository} from "@/repositories/prisma/prisma-users-repository";
import {RegisterUseCase} from "@/use-cases/register";

export function MakeRegisterUseCase(){

    const usersRepository = new PrismaUsersRepository()

    const registerUseCase = new RegisterUseCase(usersRepository)


    return registerUseCase
}