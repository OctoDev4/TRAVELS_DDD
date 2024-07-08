import {FastifyReply, FastifyRequest} from "fastify";
import {MakeRegisterUseCase} from "@/factories/make-register-use-case";
import {z} from "zod";
import {UserAlreadyExistsError} from "@/errors/user-already-exists-error";

export async function register(request:FastifyRequest,reply:FastifyReply){
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(8),
        phone: z.string().min(10).max(15),
        jobRole: z.string().min(3)
    });

    // Extrai os campos 'name', 'email' e 'password' do corpo da requisição, aplicando o esquema de validação
    const {name, email, password,phone,jobRole} = registerBodySchema.parse(request.body);


    try {
        const registerUseCase = MakeRegisterUseCase()


        await registerUseCase.execute({name,email,password,phone,jobRole})


    }catch (error){
        if(error instanceof UserAlreadyExistsError){
            return reply.status(409).send({error:error.message})
        }
        throw error
    }


    return reply.status(201).send('user created successfully');
}