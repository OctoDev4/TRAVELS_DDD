
import {beforeEach, describe, expect, it} from "vitest";
import {InMemoryUsersRepository} from "@/repositories/in-memory/in-memory-users-repository";
import {GetUserProfileUseCase} from "@/use-cases/get-user-profile";
import {hash} from "bcrypt";
import {ResourceNotFoundError} from "@/errors/resource-not-found-error";




let usersRepository:InMemoryUsersRepository

let sud:GetUserProfileUseCase


describe('get user profile Use case',()=>{
    beforeEach(()=>{

        usersRepository = new InMemoryUsersRepository()

        sud = new GetUserProfileUseCase(usersRepository)


    })

    it('it should be able to get an user by id ', async()=>{

        const createdUser = await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: await hash('password', 6),
            phone:'1234567',
            jobRole:'cargo'
        })

        const {user} = await sud.execute({
            userId: createdUser.id
        })

        expect(user.id).toStrictEqual(expect.any(String))
        expect(user.name).toEqual('John Doe')


    })

    it('should not be able to get an user with wrong id', async () => {
        await expect(sud.execute({ userId: 'non-exists-id' })).rejects.toBeInstanceOf(ResourceNotFoundError);
    });

})