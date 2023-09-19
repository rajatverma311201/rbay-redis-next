// import { createClient } from 'redis';

// const client = createClient({
// 	socket: {
// 		host: process.env.REDIS_HOST,
// 		port: parseInt(process.env.REDIS_PORT)
// 	},
// 	password: process.env.REDIS_PW
// });

import { createClient } from "redis";

const URL =
    "redis://default:bTmomknDPITAWVETE0k39YypMFevPYFw@redis-14982.c212.ap-south-1-1.ec2.cloud.redislabs.com:14982";
const client = createClient({
    password: "bTmomknDPITAWVETE0k39YypMFevPYFw",
    socket: {
        host: "redis-14982.c212.ap-south-1-1.ec2.cloud.redislabs.com",
        port: 14982,
    },
    // url: URL,
});

// console.log(URL);
client.on("error", (err) => console.error(err));
client.connect();

export { client };
