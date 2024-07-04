import {beforeEach, describe, expect, it} from "vitest";
import {InMemoryUsersRepository} from "@/repositories/in-memory/in-memory-users-repository";
import {hash} from "bcrypt";
import {DeleteUserUseCase} from "@/use-cases/delete-user";


let inMemoryusersRepository:InMemoryUsersRepository
let sud:DeleteUserUseCase


describe('Register Use case',()=>{
    beforeEach(()=>{

        inMemoryusersRepository = new InMemoryUsersRepository()
        sud = new DeleteUserUseCase(inMemoryusersRepository)


    })

    it('it should be able to delete a user ', async ()=>{

        const createdUser = await inMemoryusersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: await hash('password', 6),
            phone:'1234567',
            jobRole:'cargo'
        })

        const userId = createdUser.id

        await sud.execute({userId})

        expect(inMemoryusersRepository.items).toHaveLength(0)


    })

})