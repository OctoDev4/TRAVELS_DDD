
import {beforeEach, describe, expect, it} from "vitest";
import {InMemoryUsersRepository} from "@/repositories/in-memory/in-memory-users-repository";
import {GetUserProfileUseCase} from "@/use-cases/get-user-profile";
import {hash} from "bcrypt";
import {AuthenticateUserUseCase} from "@/use-cases/authenticate-user";
import {ResourceNotFoundError} from "@/errors/resource-not-found-error";
import {InvalidCredentialsError} from "@/errors/invalid-credentials-error";




let usersRepository:InMemoryUsersRepository

let sud:AuthenticateUserUseCase


describe('authenticate use case ',()=>{
    beforeEach(()=>{

        usersRepository = new InMemoryUsersRepository()

        sud = new AuthenticateUserUseCase(usersRepository)


    })

    it('it should be able to get an user by id ', async()=>{

        const createdUser = await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: await hash('password', 6),
            phone:'1234567',
            jobRole:'cargo'
        })

        console.log(createdUser.password)

        const {user} = await sud.execute({
            email:createdUser.email,
            password:'password',
        })

        expect(user.id).toStrictEqual(expect.any(String))
        expect(user.name).toEqual('John Doe')


    })


    it('it should be able authenticate an user  ', async()=>{

        const createdUser = await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: await hash('password', 6),
            phone:'1234567',
            jobRole:'cargo'
        })

        console.log(createdUser.password)

        const {user} = await sud.execute({
            email:createdUser.email,
            password:'password',
        })

        expect(user.id).toStrictEqual(expect.any(String))
        expect(user.name).toEqual('John Doe')


    })


    it('it should not be able authenticate an user with wrong credentials', async()=>{

        const createdUser = await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: await hash('password', 6),
            phone:'1234567',
            jobRole:'cargo'
        })

        await expect(sud.execute({email:createdUser.email, password:'123456789'})).rejects.toBeInstanceOf(InvalidCredentialsError);


    })

})