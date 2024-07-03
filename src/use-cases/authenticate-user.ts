import {User} from "@prisma/client";
import {UsersRepository} from "@/repositories/users-repository";
import {compare} from "bcrypt";
import {InvalidCredentialsError} from "@/errors/invalid-credentials-error";

interface AuthenticateUserRequest{
    email:string,
    password:string
}

export interface AuthenticateUserResponse {
    user:User
}


export class AuthenticateUserUseCase{

    constructor(private usersRepository:UsersRepository){}

    async execute({email,password}:AuthenticateUserRequest):Promise<AuthenticateUserResponse>{

        const user = await this.usersRepository.findByEmail(email)

        if(!user){

            throw new InvalidCredentialsError()

        }

        const doesPasswordMatch = await compare(password, user.password)

        if(!doesPasswordMatch){
            throw new InvalidCredentialsError()
        }


        return {
            user
        }
    }
}