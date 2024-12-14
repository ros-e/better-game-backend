import { Elysia } from "elysia";
import { cors } from '@elysiajs/cors'


const app = new Elysia()
    .get('/assets', ({ query }) => {
        const { username, auth } = query;

        if (!username || !auth) {
            return {
                error: "Missing required query parameters: username and auth"
            };
        }

        return {
            message: "Query parameters received successfully",
            data: {
                username,
                auth
            }
        };
    })
    .use(cors())
    .listen(8080);

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
