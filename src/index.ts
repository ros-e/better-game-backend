import { Elysia } from "elysia";
import { cors } from '@elysiajs/cors'
import fs from 'fs';
import path from 'path';
const ASSETS_FOLDER = './assets'; // Path to the assets folder

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
    .get('/volume', () => {

    })
    .post('/matchmaking-log', ({body}) => {
      console.log(body)
    })
    .post('/kill', ({ query }) => {
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
    .post('/launch-offline', () => {
      return {
        message: "hai"
      }
    })
    .post('/region-ping',() => {
        return {
            message: "Query parameters received successfully",
            data: {
            }
        };
    })
    .post('/fetch-assets', () => {
      try {
          const files = fs.readdirSync(ASSETS_FOLDER);
  
          const assets = files.map((file) => {
              const filePath = path.join(ASSETS_FOLDER, file);
              const stats = fs.statSync(filePath);
              return {
                  name: file,
                  size: `${(stats.size / (1024 * 1024)).toFixed(1)} MB`
              };
          });
  
          return assets; 
      } catch (error) {
          console.error("Error fetching assets:", error);
          return { error: "Failed to fetch assets" };
      }
  })
    .use(cors())
    .listen(8080);

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
