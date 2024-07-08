import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import {InMemoryTravelsRepository} from "@/repositories/in-memory/in-memory-travels-repository";
import {EditTravelUseCase} from "@/use-cases/edit-travel";
import {NotAllowedError} from "@/errors/not-allowed-error";

let usersRepository: InMemoryUsersRepository;
let travelsRepository:InMemoryTravelsRepository;
let sud: EditTravelUseCase;

describe('Edit travel Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        travelsRepository = new InMemoryTravelsRepository()
        sud = new EditTravelUseCase(usersRepository,travelsRepository);
    });

    it('should be able to edit a travel', async () => {
        // Cria um usuário inicial
        const createdUser = await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '12345',
            phone: '1234567',
            jobRole: 'cargo'
        });

        const userId = createdUser.id.toString()


        const travelCreated = await travelsRepository.createTravel({
            reason: "Viagem de negócios",
            traveler: "João da Silva",
            startDate: new Date('2024-07-10'),
            endDate: new Date('2024-07-15'),
            destination: "São Paulo",
            totalExpenses: 1500,
            authorId: userId,
            }

        )

        const travelId = travelCreated.id


        await sud.execute({userId,travelId,

            reason:'viagem editada'

        })
        expect(travelsRepository.items[0].reason).toEqual('viagem editada')

        expect(travelsRepository.items[0]).toMatchObject({

            traveler: "João da Silva",
            startDate: new Date('2024-07-10'),
            endDate: new Date('2024-07-15'),
            destination: "São Paulo",
            totalExpenses: 1500,

        });

        console.log(travelCreated)
    });





    it('should  not be able to edit a travel from another user', async () => {
        const createdUser = await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '1234567' ,
            phone: '1234567',
            jobRole: 'cargo'
        });

        const userId = createdUser.id.toString()


        const userNotAllowed = await usersRepository.create({
            name: 'not allowed',
            email: 'notallowed@email.com',
            password:'123456',
            phone: '1234567',
            jobRole: 'cargo'
        });

        const userNotAllowedId = userNotAllowed.id.toString()




        const travelCreated = await travelsRepository.createTravel({
                reason: "Viagem de negócios",
                traveler: "João da Silva",
                startDate: new Date('2024-07-10'),
                endDate: new Date('2024-07-15'),
                destination: "São Paulo",
                totalExpenses: 1500,
                authorId: userId,
            }

        )

        const travelId = travelCreated.id.toString()


        await expect(()=>sud.execute({
            userId:userNotAllowedId,
            travelId,
        })).rejects.toBeInstanceOf(NotAllowedError)

    });
});
