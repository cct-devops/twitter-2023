import Fastify from 'fastify';
import { isTokenValid } from './util.js';

const app = Fastify({
    logger: true
});

app.get('/timeline', async (request, response) => {
    
    // the token is in a header called Authorization
    const tokenHeader = request.headers['authorization'];

    // token has the structure of "bearer <token>". We only want <token>
    if(!isTokenValid(tokenHeader)) {
        return response.status(401).send({message: 'Unauthorized'});
    }

    // Here we know the token is correct, so we can do our business logic
    console.log('-------------------', token);
    return "hello!"
});


await app.listen({port: 8081, host: '0.0.0.0'});
app.log.info('Fastify server started');