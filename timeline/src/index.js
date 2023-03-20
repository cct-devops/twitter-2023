import Fastify from 'fastify';

const app = Fastify({
    logger: true
});

app.get('/timeline', async (request, response) => {
    return "hello!"
});

app.listen({port: 8081, host: '0.0.0.0'});