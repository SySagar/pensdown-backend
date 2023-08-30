import * as redis from 'redis';

const client=redis.createClient(process.env.REDIS_URL as any) 

client.on('error', (err) => {
    console.log("Error " + err);
}
);

client.on('connect', () => {
    console.log('Redis client connected');
}
);

export default client;