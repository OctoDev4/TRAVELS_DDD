import {Travel} from "@prisma/client";
import {TravelsRepository} from "@/repositories/travels-repository";

interface FetchTravelsByAuthorIdUseCaseRequest{
    page:number,
    authorId: string

}

interface FetchTravelsByAuthorIdUseCaseResponse{
    travels:Travel[] | null
}


export class FetchTravelsByAuthorIdUseCase{
    constructor(
        private travelsRepository: TravelsRepository
    ) {}





    async execute({page,authorId}:FetchTravelsByAuthorIdUseCaseRequest):Promise<FetchTravelsByAuthorIdUseCaseResponse>{
        const travels = await this.travelsRepository.fetchTravelsAuthorId(page, authorId)

        return {
            travels
        }
    }
}