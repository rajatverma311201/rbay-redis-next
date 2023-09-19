import { createClient } from "redis";

const client = createClient({
    password: process.env.REDIS_PW,
    socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT as string),
    },
    // url: URL,
});

// console.log(URL);
client.on("error", (err) => console.error(err));
client.connect();

export { client };
