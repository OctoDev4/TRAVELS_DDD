
import {beforeEach, describe, expect, it} from "vitest";
import {InMemoryUsersRepository} from "@/repositories/in-memory/in-memory-users-repository";
import {GetUserProfileUseCase} from "@/use-cases/get-user-profile";
import {hash} from "bcrypt";
import {ResourceNotFoundError} from "@/errors/resource-not-found-error";
import {InMemoryTravelsRepository} from "@/repositories/in-memory/in-memory-travels-repository";
import {FetchTravelByStartDateUseCase} from "@/use-cases/fetch-travel-by-start-date";
import {FetchAllTravelsUseCase} from "@/use-cases/fetch-all-travels";




let usersRepository:InMemoryUsersRepository
let travelsRepository:InMemoryTravelsRepository

let sud:FetchAllTravelsUseCase


describe('fetch all travels use case ',()=>{
    beforeEach(()=>{

        usersRepository = new InMemoryUsersRepository()

        travelsRepository = new InMemoryTravelsRepository(usersRepository)

        sud = new FetchAllTravelsUseCase(travelsRepository)


    })

    it('it be able to fetch questions by same date', async()=>{



        for(let i = 0 ; i< 22 ; i++){
            await travelsRepository.createTravel({
                reason:`reason${i}`,
                traveler:`traveler${i}`,
                startDate:new Date(),
                endDate:new Date(),
                destination:`destino${i}`,
                totalExpenses:100,
                authorId:'1',
            })
        }

        const result = await sud.execute({page:2})


        expect(result.travels).toHaveLength(2)

    })


})