import {PrismaUsersRepository} from "@/repositories/prisma/prisma-users-repository";
import {AuthenticateUserUseCase} from "@/use-cases/authenticate-user";

export function MakeAuthenticateUseCase(){

        const usersRepository = new PrismaUsersRepository()

        const authenticateUseCase = new AuthenticateUserUseCase(usersRepository)


        return authenticateUseCase
}