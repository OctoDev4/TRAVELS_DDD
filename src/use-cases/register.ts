import {User} from "@prisma/client";
import {UsersRepository} from "@/repositories/users-repository";
import {hash} from "bcrypt";
import {UserAlreadyExistsError} from "@/errors/user-already-exists-error";

interface RegisterUseCaseRequest {

    name:string,
    email:string,
    password: string,
    phone:string,
    jobRole:string
}

interface RegisterUseCaseResponse {
    user:User
}


export class RegisterUseCase{
    constructor(private usersRepository:UsersRepository) {}

    async execute({name,email,password,phone,jobRole}:RegisterUseCaseRequest):Promise<RegisterUseCaseResponse>{
        const passwordHash = await hash(password, 6)

        const userExists = await this.usersRepository.findByEmail(email)

        if(userExists){
          throw new UserAlreadyExistsError()
        }

        const user = await this.usersRepository.create({
            name,
            email,
            password: passwordHash,
            phone,
            jobRole
        })

        return{
            user
        }
    }
}
