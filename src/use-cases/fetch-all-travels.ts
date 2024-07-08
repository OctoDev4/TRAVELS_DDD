import {Travel} from "@prisma/client";
import {TravelsRepository} from "@/repositories/travels-repository";

 interface FetchAllTravelsUseCaseRequest{
    page: number
}

 interface FetchAllTravelsUseCaseResponse {
    travels: Travel[] | null
}


export class FetchAllTravelsUseCase{
    constructor(
        private travelsRepository: TravelsRepository
    ) {}


    async execute({page}:FetchAllTravelsUseCaseRequest):Promise<FetchAllTravelsUseCaseResponse>{
        const travels = await this.travelsRepository.fetchAllTravels(page)
        return {
            travels
        }
    }
}