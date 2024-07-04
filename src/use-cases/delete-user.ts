import { UsersRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";

export interface DeleteUserUseCaseRequest {
    userId:string;
}

export class DeleteUserUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ userId }: DeleteUserUseCaseRequest) {
        // Busca o usuário pelo ID no repositório
        const userExist = await this.usersRepository.findById(userId);

        // Verifica se o usuário existe
        if (!userExist) {
            throw new ResourceNotFoundError()
        }

        // Deleta o usuário do repositório
        await this.usersRepository.delete(userExist);
    }
}
