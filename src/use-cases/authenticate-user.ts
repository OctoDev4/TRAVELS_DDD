import { User } from "@prisma/client";
import { UsersRepository } from "@/repositories/users-repository";
import { compare } from "bcrypt";
import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";

// Interface que define a estrutura da requisição de autenticação do usuário
interface AuthenticateUserRequest {
    email: string;
    password: string;
}

// Interface que define a estrutura da resposta da autenticação do usuário
export interface AuthenticateUserResponse {
    user: User; // O usuário autenticado
}

// Classe que implementa o caso de uso de autenticação do usuário
export class AuthenticateUserUseCase {

    // Construtor que recebe uma instância de UsersRepository para acesso aos dados
    constructor(private usersRepository: UsersRepository) {}

    // Método principal que executa a autenticação do usuário
    async execute({ email, password }: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
        // Busca o usuário pelo email fornecido
        const user = await this.usersRepository.findByEmail(email);

        // Se o usuário não existe, lança um erro de credenciais inválidas
        if (!user) {
            throw new InvalidCredentialsError();
        }

        // Compara a senha fornecida com a senha hasheada armazenada no usuário
        const doesPasswordMatch = await compare(password, user.password);

        // Se a senha não corresponde, lança um erro de credenciais inválidas
        if (!doesPasswordMatch) {
            throw new InvalidCredentialsError();
        }

        // Se tudo estiver correto, retorna o usuário autenticado na resposta
        return {
            user
        };
    }
}
