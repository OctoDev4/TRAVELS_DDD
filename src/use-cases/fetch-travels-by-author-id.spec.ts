
import {beforeEach, describe, expect, it} from "vitest";
import {InMemoryUsersRepository} from "@/repositories/in-memory/in-memory-users-repository";
import {InMemoryTravelsRepository} from "@/repositories/in-memory/in-memory-travels-repository";
import {FetchTravelsByAuthorIdUseCase} from "@/use-cases/fetch-travels-by-author-id";


let usersRepository:InMemoryUsersRepository
let travelsRepository:InMemoryTravelsRepository

let sud:FetchTravelsByAuthorIdUseCase


describe('fetch all travels use case ',()=>{
    beforeEach(()=>{

        usersRepository = new InMemoryUsersRepository()

        travelsRepository = new InMemoryTravelsRepository(usersRepository)

        sud = new FetchTravelsByAuthorIdUseCase(travelsRepository)


    })

    it('it be able to fetch all author questions', async()=>{

           const newTravel = await travelsRepository.createTravel({
                reason:`reason`,
                traveler:`traveler}`,
                startDate:new Date(),
                endDate:new Date(),
                destination:`destino`,
                totalExpenses:100,
                authorId:'1',
            })


        const result = await sud.execute({page:1,authorId:'1'})


        expect(result.travels).toHaveLength(1)



    })


    it('should be able to fetch specific user travel',async () => {



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


        const result = await sud.execute({page:2,authorId:'1'})

        expect(result.travels).toHaveLength(2)

    });


})