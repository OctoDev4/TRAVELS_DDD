import {UsersRepository} from "@/repositories/users-repository";
import {RegisterUseCase} from "@/use-cases/register";
import {beforeEach, describe, expect, it} from "vitest";
import {InMemoryUsersRepository} from "@/repositories/in-memory/in-memory-users-repository";
import {compare} from "bcrypt";


let usersRepository:InMemoryUsersRepository
let sud:RegisterUseCase


describe('Register Use case',()=>{
    beforeEach(()=>{

        usersRepository = new InMemoryUsersRepository()
        sud = new RegisterUseCase(usersRepository)


    })

    it('it should be able to create a user ', async()=>{
        const {user} = await sud.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
            phone:'1234567',
            jobRole:'cargo'
        })

        expect(user.id).toEqual(expect.any(String))
        expect(usersRepository.items).toHaveLength(1)



    })

    it('should be able to create an user with a hashed password',async () => {

        const {user} = await sud.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
            phone:'1234567',
            jobRole:'cargo'
        })
        const isHashed = await compare('123456', user.password)

        expect(isHashed).toBe(true)

    });

})