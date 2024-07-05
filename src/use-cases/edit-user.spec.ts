import { beforeEach, describe, expect, it } from "vitest";
import { compare, hash } from "bcrypt";
import { EditUserUseCase } from "@/use-cases/edit-user";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

let usersRepository: InMemoryUsersRepository;
let sud: EditUserUseCase;

describe('Edit User Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        sud = new EditUserUseCase(usersRepository);
    });

    it('should be able to edit a user', async () => {
        // Cria um usuário inicial
        const createdUser = await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: await hash('password', 6), // Hash da senha 'password'
            phone: '1234567',
            jobRole: 'cargo'
        });

        // Executa o caso de uso para editar o usuário
        const { user } = await sud.execute({
            id: createdUser.id,
            name: 'edited user',
            password: 'newpassword' // Nova senha em texto plano
        });

        // Verifica se o ID do usuário editado é o mesmo do usuário criado
        expect(user.id).toEqual(createdUser.id);

        // Verifica se o nome foi atualizado corretamente
        expect(usersRepository.items[0].name).toEqual('edited user');

        // Verifica se a senha foi atualizada corretamente usando compare do bcrypt
        const isPasswordValid = await compare('newpassword', usersRepository.items[0].password);



        expect(isPasswordValid).toBe(true); // A senha 'newpassword' deve ser válida após hash

        // Verifica se outros campos não foram alterados
        expect(usersRepository.items[0]).toMatchObject({
            email: 'johndoe@example.com',
            phone: '1234567',
            jobRole: 'cargo'
        });
    });
});
