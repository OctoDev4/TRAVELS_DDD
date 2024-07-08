
import {beforeEach, describe, expect, it} from "vitest";
import {InMemoryUsersRepository} from "@/repositories/in-memory/in-memory-users-repository";
import {GetUserProfileUseCase} from "@/use-cases/get-user-profile";
import {hash} from "bcrypt";
import {InMemoryTravelsRepository} from "@/repositories/in-memory/in-memory-travels-repository";
import {FetchTravelWithAuthorUseCase} from "@/use-cases/fetch-travel-with-author";
import dayjs from "dayjs";




let usersRepository:InMemoryUsersRepository
let travelsRepository:InMemoryTravelsRepository

let sud:FetchTravelWithAuthorUseCase


describe('fetch travel by date Use case',()=> {
    beforeEach(() => {

        usersRepository = new InMemoryUsersRepository()

        travelsRepository = new InMemoryTravelsRepository(usersRepository)

        sud = new FetchTravelWithAuthorUseCase(travelsRepository)


    })

    it('it be able to fetch travels paginated', async () => {

        const createdUser = await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password',
            phone: '1234567',
            jobRole: 'cargo'
        })

        for(let i = 0 ; i< 22 ; i++){
            await travelsRepository.createTravel({
                reason:`reason${i}`,
                traveler:`traveler${i}`,
                startDate:new Date(),
                endDate:new Date(),
                destination:`destino${i}`,
                totalExpenses:100,
                authorId:createdUser.id,
            })
        }

        const result = await sud.execute({page:1
        })

        console.log(result)
        expect(result.travels).toHaveLength(20)


    })
})