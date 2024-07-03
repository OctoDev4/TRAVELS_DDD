import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import {env} from "@/env";
import fastifyCookie from "@fastify/cookie";
import {ZodError} from "zod";

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

app.register(fastifyCookie)


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