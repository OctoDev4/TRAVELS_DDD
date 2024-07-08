import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import {env} from "@/env";
import fastifyCookie from "@fastify/cookie";
import {ZodError} from "zod";
import fastifyCors from "@fastify/cors";
import {userRoutes} from "@/http/controllers/users/routes";


export const app = fastify()

app.register(
    fastifyJwt,{
        secret:env.JWT_SECRET,
        cookie:{
            cookieName: 'refreshToken',
            signed:false
        },
        sign:{
            expiresIn:'10'
        }
    }

)
app.register(userRoutes
)

app.register(fastifyCookie)


app.register(fastifyCors, {
    origin: '*', // Define a origem permitida. '*' permite todas as origens.
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'] // Cabeçalhos permitidos
});



app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
        return reply
            .status(400)
            .send({ message: 'Validation error.', issues: error.format() })
    }

    if (env.NODE_ENV !== 'production') {
        console.error(error)
    } else {
        // TODO: Here we should log to a external tool like DataDog/NewRelic/Sentry
    }

    return reply.status(500).send({ message: 'Internal server error.' })
})