import {beforeEach, describe, expect, it} from "vitest";
import {InMemoryUsersRepository} from "@/repositories/in-memory/in-memory-users-repository";
import {hash} from "bcrypt";
import {DeleteUserUseCase} from "@/use-cases/delete-user";
import {InMemoryTravelsRepository} from "@/repositories/in-memory/in-memory-travels-repository";
import {CreateTravelUseCase} from "@/use-cases/create-travel";
import dayjs from "dayjs";


let inMemoryusersRepository:InMemoryUsersRepository
let inMemoryTravelsRepository:InMemoryTravelsRepository
let sud:CreateTravelUseCase


describe('create a travel Use case',()=>{
    beforeEach(()=>{

        inMemoryusersRepository = new InMemoryUsersRepository()
        inMemoryTravelsRepository = new InMemoryTravelsRepository
        sud = new CreateTravelUseCase(inMemoryTravelsRepository,inMemoryusersRepository)


    })

    it('it should be able to create a travel ', async ()=>{


      const user = await  inMemoryusersRepository.create({
          name: 'John Doe',
          email: 'johndoe@example.com',
          password: await hash('password', 6),
          phone:'1234567',
          jobRole:'cargo'
      })

    const travelCreated = {
        reason: "Viagem de negócios",
        traveler: "João da Silva",
        startDate: new Date(),
        endDate: new Date(),
        destination: "São Paulo",
        totalExpenses: 1500,
        authorId: user.id,
    }



        await sud.execute(travelCreated)



        expect(inMemoryTravelsRepository.items).toHaveLength(1)

    })

})