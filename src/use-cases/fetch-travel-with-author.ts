import {Travel} from "@prisma/client";
import {TravelsRepository} from "@/repositories/travels-repository";

interface FetchTravelWithAuthorUseCaseRequest{
    page:number
}

interface FetchTravelWithAuthorUseCaseResponse{
    travels:Travel[] | null
}



export class FetchTravelWithAuthorUseCase{
    constructor(
        private travelsRepository: TravelsRepository
    ){}


    async execute({page}:FetchTravelWithAuthorUseCaseRequest):Promise<FetchTravelWithAuthorUseCaseResponse>{

        const travels = await this.travelsRepository.fetchTravelsWithAuthorName(page)
        return {
            travels
        }
    }
}