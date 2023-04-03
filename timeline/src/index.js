import Fastify from 'fastify';
<<<<<<< HEAD
import { existsInCache, saveInCache } from './cache.js';
import { getTimelineFor } from './mysql.js';
import { userReadTimeline } from './stats/index.js';
=======
import { getTimelineFor } from './mysql.js';
>>>>>>> 475c52744023e7ecaa46f5c55efded3288bd714d
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
    userReadTimeline('dagonza'); // TODO get this from the token
    // connect here....
    const cache = await existsInCache('dagonza');
    if (cache) {
        app.log.info('This is being served from the cache');
        return JSON.parse(cache);
    } else {
        const result = await getTimelineFor('dagonza'); //TODO see how we get the user from the JWT token.
        app.log.info('This is being served from the database');
        saveInCache('dagonza', result);
        return result;
    }
});

await app.listen({ port: 8081, host: '0.0.0.0' });
app.log.info('Fastify server started');