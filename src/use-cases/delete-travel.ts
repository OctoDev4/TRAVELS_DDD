import {TravelsRepository} from "@/repositories/travels-repository";
import {UsersRepository} from "@/repositories/users-repository";
import {ResourceNotFoundError} from "@/errors/resource-not-found-error";
import {NotAllowedError} from "@/errors/not-allowed-error";

interface DeleteTravelUseCaseRequest{
    authorId:string,
    travelId:string,
}



export class DeleteTravelUseCase  {


    constructor(
        private travelsRepository:TravelsRepository,
        private usersRepository:UsersRepository
    ) {}

    async execute({authorId,travelId} :DeleteTravelUseCaseRequest){

        const author  = await this.usersRepository.findById(authorId)
        if(!author){
            throw new ResourceNotFoundError()
        }

        const travel = await this.travelsRepository.getTravelById(travelId)

        if(!travel){
            throw new ResourceNotFoundError()
        }

        if(author.id !== travel.authorId){
            throw new NotAllowedError()
        }

        return await this.travelsRepository.deleteTravel(travel)
    }
}
