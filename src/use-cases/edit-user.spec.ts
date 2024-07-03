import {UsersRepository} from "@/repositories/users-repository";
import {RegisterUseCase} from "@/use-cases/register";
import {beforeEach, describe, expect, it} from "vitest";
import {InMemoryUsersRepository} from "@/repositories/in-memory/in-memory-users-repository";
import {compare, hash} from "bcrypt";
import {EditUserUseCase} from "@/use-cases/edit-user";


let usersRepository:InMemoryUsersRepository
let sud:EditUserUseCase


describe('Register Use case',()=>{
    beforeEach(()=>{

        usersRepository = new InMemoryUsersRepository()
        sud = new EditUserUseCase(usersRepository)


    })

    it('it should be able to edit an user ', async()=>{

        const createdUser = await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: await hash('password', 6),
            phone:'1234567',
            jobRole:'cargo'
        })
        console.log(createdUser)


        const {user} = await sud.execute({
           id:createdUser.id,
           name:'edited user'
        })

        expect(user.id).toEqual(createdUser.id)
        expect(usersRepository.items[0]).toMatchObject({
            name:'edited user'
        })

        console.log(user)



    })



})