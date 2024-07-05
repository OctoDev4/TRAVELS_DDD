import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { hash } from "bcrypt";

interface EditUserRequest {
    id: string;
    name?: string;
    email?: string;
    password?: string;
    phone?: string;
    jobRole?: string;
}

interface EditUserResponse {
    user: User;
}

export class EditUserUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({
                      id,
                      name,
                      email,
                      password,
                      phone,
                      jobRole,
                  }: EditUserRequest): Promise<EditUserResponse> {
        // Verifica se o usuário existe no repositório usando o ID fornecido
        const userExists = await this.usersRepository.findById(id);

        // Se o usuário não existe, lança um erro ResourceNotFoundError
        if (!userExists) {
            throw new ResourceNotFoundError();
        }

        // Atualiza apenas os campos fornecidos na requisição
        if (name !== undefined) {
            userExists.name = name;
        }
        if (email !== undefined) {
            userExists.email = email;
        }
        if (password !== undefined) {
            // Hash da nova senha usando bcrypt
            const hashedPassword = await hash(password, 10); // 10 é o número de rounds de hash (custo computacional)
            userExists.password = hashedPassword;
        }
        if (phone !== undefined) {
            userExists.phone = phone;
        }
        if (jobRole !== undefined) {
            userExists.jobRole = jobRole;
        }

        // Salva o usuário atualizado no repositório
        const updatedUser = await this.usersRepository.save(userExists);

        // Retorna o usuário atualizado como parte da resposta
        return { user: updatedUser };
    }
}
