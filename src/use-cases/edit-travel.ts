import { UsersRepository } from "@/repositories/users-repository";
import {Travel, User} from "@prisma/client";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";

interface EditTravelUseCaseRequest {
    id: string;
    name?: string;
    email?: string;
    password?: string;
    phone?: string;
    jobRole?: string;
}

interface EditUserRequestUseCaseRespose {
    travel: Travel;
}

export class EditUserUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({

                  }): Promise<> {

}
