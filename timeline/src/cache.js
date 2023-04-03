import {createClient} from 'redis';

export async function existsInCache(username) {
    const client = createClient();
    client.on('error', console.log);
    await client.connect();
    if (await client.exists(`${username}-timeline`)) {
        return client.get(`${username}-timeline`);
    }
    await client.disconnect();
    return null;
}

export async function saveInCache(username, value) {
    const client = createClient();
    client.on('error', console.log);
    await client.connect();
    await client.set(`${username}-timeline`, JSON.stringify(value));
    return client.disconnect();
}