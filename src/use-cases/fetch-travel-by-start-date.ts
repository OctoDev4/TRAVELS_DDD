import {Travel} from "@prisma/client";
import {UsersRepository} from "@/repositories/users-repository";
import {TravelsRepository} from "@/repositories/travels-repository";
import {NotAllowedError} from "@/errors/not-allowed-error";

interface FetchTravelByStartDateUseCaseRequest{
    startDate:Date,
    userId:string
}

interface FetchTravelByStartDateUseCaseResponse {
    travel:Travel
}

export class FetchTravelByStartDateUseCase{
    constructor(
        private usersRepository:UsersRepository,
        private travelsRepository:TravelsRepository
    ) {}


    async execute({startDate,userId}:FetchTravelByStartDateUseCaseRequest){


        const user = await this.usersRepository.findById(userId)

        if(!user){
            throw new NotAllowedError()
        }

       const travels = await this.travelsRepository.fetchTravelsByStartDate(startDate)

        return{
            travels:travels
        }


    }
}

