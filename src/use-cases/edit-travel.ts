import { UsersRepository } from "@/repositories/users-repository";
import { Travel } from "@prisma/client";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { TravelsRepository } from "@/repositories/travels-repository";
import { NotAllowedError } from "@/errors/not-allowed-error";

interface EditTravelRequest {
    travelId: string;
    userId: string;
    reason?: string;
    traveler?: string;
    startDate?: Date;
    endDate?: Date;
    destination?: string;
    totalExpenses?: number;
}

interface EditTravelResponse {
    travel: Travel;
}

export class EditTravelUseCase {
    constructor(
        private usersRepository: UsersRepository,
        private travelsRepository: TravelsRepository
    ) {}

    async execute({
                      travelId,
                      userId,
                      reason,
                      traveler,
                      startDate,
                      endDate,
                      destination,
                      totalExpenses
                  }: EditTravelRequest): Promise<EditTravelResponse> {
        // Verifica se o usuário existe no repositório usando o ID fornecido
        const userExists = await this.usersRepository.findById(userId);

        // Se o usuário não existe, lança um erro ResourceNotFoundError
        if (!userExists) {
            throw new ResourceNotFoundError();
        }

        // Verifica se a viagem existe no repositório usando o travelId fornecido
        const travelExists = await this.travelsRepository.getTravelById(travelId);

        // Se a viagem não existe, lança um erro ResourceNotFoundError
        if (!travelExists) {
            throw new ResourceNotFoundError();
        }

        // Verifica se o usuário tem permissão para editar esta viagem
        if (travelExists.authorId !== userExists.id) {
            throw new NotAllowedError();
        }

        // Atualiza apenas os campos fornecidos na requisição
        if (reason !== undefined) {
            travelExists.reason = reason;
        }
        if (traveler !== undefined) {
            travelExists.traveler = traveler;
        }
        if (startDate !== undefined) {
            travelExists.startDate = startDate;
        }
        if (endDate !== undefined) {
            travelExists.endDate = endDate;
        }
        if (destination !== undefined) {
            travelExists.destination = destination;
        }
        if (totalExpenses !== undefined) {
            travelExists.totalExpenses = totalExpenses;
        }

        // Salva a viagem atualizada no repositório
        const updatedTravel = await this.travelsRepository.updateTravel(travelExists);

        // Retorna a viagem atualizada como parte da resposta
        return { travel: updatedTravel };
    }
}
