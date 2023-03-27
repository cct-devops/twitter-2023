import Fastify from 'fastify';
import { getTimelineFor } from './mysql.js';
import { isTokenValid } from './util.js';

const app = Fastify({
    logger: true
});

app.get('/timeline', async (request, response) => {

    // the token is in a header called Authorization
    const tokenHeader = request.headers['authorization'];

    // token has the structure of "bearer <token>". We only want <token>
    if (!isTokenValid(tokenHeader)) {
        return response.status(401).send({ message: 'Unauthorized' });
    }

    // connect here....
    return await getTimelineFor('dagonza'); //TODO see how we get the user from the JWT token.
});

await app.listen({ port: 8081, host: '0.0.0.0' });
app.log.info('Fastify server started');