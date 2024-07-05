import {beforeEach, describe, expect, it} from "vitest";
import {InMemoryUsersRepository} from "@/repositories/in-memory/in-memory-users-repository";
import {hash} from "bcrypt";
import {InMemoryTravelsRepository} from "@/repositories/in-memory/in-memory-travels-repository";
import {DeleteTravelUseCase} from "@/use-cases/delete-travel";
import {NotAllowedError} from "@/errors/not-allowed-error";



let inMemoryusersRepository:InMemoryUsersRepository
let inMemoryTravelsRepository:InMemoryTravelsRepository
let sud:DeleteTravelUseCase


describe('delete a travel Use case',()=>{
    beforeEach(()=>{

        inMemoryusersRepository = new InMemoryUsersRepository()
        inMemoryTravelsRepository = new InMemoryTravelsRepository
        sud = new DeleteTravelUseCase(inMemoryTravelsRepository,inMemoryusersRepository)


    })

    it('it should be able to delete a travel ', async ()=>{


        const user = await  inMemoryusersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: await hash('password', 6),
            phone:'1234567',
            jobRole:'cargo'
        })

        const travelCreated = await inMemoryTravelsRepository.createTravel({

            reason: "Viagem de negócios",
            traveler: "João da Silva",
            startDate: new Date(),
            endDate: new Date(),
            destination: "São Paulo",
            totalExpenses: 1500,
            authorId: user.id,

        })
        await inMemoryTravelsRepository.createTravel({

            reason: "Viagem de negócios",
            traveler: "João da Silva",
            startDate: new Date(),
            endDate: new Date(),
            destination: "São Paulo",
            totalExpenses: 1500,
            authorId: user.id,

        })





        await sud.execute({authorId:travelCreated.authorId,travelId:travelCreated.id})

        expect(inMemoryTravelsRepository.items).toHaveLength(1)


    })

    it('should not be able to delete a travel from another user',async () => {

        const user = await  inMemoryusersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: await hash('password', 6),
            phone:'1234567',
            jobRole:'cargo'
        })

        const notAllowedUSer = await inMemoryusersRepository.create({
            name: 'John Doe 2',
            email: 'johndoe2@example.com',
            password: await hash('password', 6),
            phone:'1234567',
            jobRole:'cargo'
        })


      const travelCreated =  await inMemoryTravelsRepository.createTravel({

            reason: "Viagem de negócios",
            traveler: "João da Silva",
            startDate: new Date(),
            endDate: new Date(),
            destination: "São Paulo",
            totalExpenses: 1500,
            authorId: user.id,

        })


      await expect(()=>sud.execute({
          authorId:notAllowedUSer.id,
          travelId:travelCreated.id
      })).rejects.toBeInstanceOf(NotAllowedError)


    });

})