import { TravelsRepository } from "@/repositories/travels-repository";
import { Travel } from "@prisma/client";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import {UsersRepository} from "@/repositories/users-repository";
import {NotAllowedError} from "@/errors/not-allowed-error"; // Importe o locale brasileiro para dayjs

interface CreateTravelRequest {
    reason: string;
    traveler: string;
    startDate: Date;
    endDate: Date;
    destination: string;
    totalExpenses?: number;
    authorId: string;
}

interface CreateTravelResponse {
    travel: Travel;
}

export class CreateTravelUseCase {
    constructor(
        private travelsRepository: TravelsRepository,
        private usersRepository:UsersRepository
    ) {}

    async execute({
                      reason,
                      traveler,
                      startDate,
                      endDate,
                      destination,
                      totalExpenses = 0,
                      authorId,
                  }: CreateTravelRequest): Promise<CreateTravelResponse> {

        const userExists = await this.usersRepository.findById(authorId)

        if (!userExists){
            throw new NotAllowedError()
        }

        const newTravel = {
            reason,
            traveler,
            startDate: dayjs(startDate).toDate(),
            endDate: dayjs(endDate).toDate(),
            destination,
            totalExpenses,
            authorId,
        };

        const createdTravel = await this.travelsRepository.createTravel(newTravel);

        return { travel: createdTravel };
    }
}
