
import {beforeEach, describe, expect, it} from "vitest";
import {InMemoryUsersRepository} from "@/repositories/in-memory/in-memory-users-repository";
import {GetUserProfileUseCase} from "@/use-cases/get-user-profile";
import {hash} from "bcrypt";
import {ResourceNotFoundError} from "@/errors/resource-not-found-error";
import {InMemoryTravelsRepository} from "@/repositories/in-memory/in-memory-travels-repository";
import {FetchTravelByStartDateUseCase} from "@/use-cases/fetch-travel-by-start-date";




let usersRepository:InMemoryUsersRepository
let travelsRepository:InMemoryTravelsRepository

let sud:FetchTravelByStartDateUseCase


describe('fetch travel by date Use case',()=>{
    beforeEach(()=>{

        usersRepository = new InMemoryUsersRepository()

        travelsRepository = new InMemoryTravelsRepository(usersRepository)

        sud = new FetchTravelByStartDateUseCase(usersRepository,travelsRepository)


    })

    it('it be able to fetch questions by same date', async()=>{

        const createdUser = await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password',
            phone:'1234567',
            jobRole:'cargo'
        })

        const userId = createdUser.id.toString()


        const travelCreated = await travelsRepository.createTravel({
                reason: "Viagem de negócios",
                traveler: "João da Silva",
                startDate: new Date('2024-07-10'),
                endDate: new Date('2024-07-15'),
                destination: "São Paulo",
                totalExpenses: 1500,
                authorId: '1',
            }

        )

       const result= await sud.execute({userId, startDate:new Date('2024-07-10')})


        expect(result.travels).toBeDefined()


        if (result.travels) {
            const travel = result.travels[0];
            expect(travel.reason).toEqual("Viagem de negócios");
            expect(travel.startDate.toISOString()).toEqual(new Date('2024-07-10').toISOString());
            expect(travel.endDate.toISOString()).toEqual(new Date('2024-07-15').toISOString());
        }

    })


})