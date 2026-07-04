import http from 'node:http'
import {WebSocketServer} from 'ws';
import fs from 'node:fs/promises';
import path from 'path';

import {redisPublish, redisSubscribe} from './connection.js'

const PORT = process.env.PORT ?? 8000;
const REDIS_CHANNEL = 'ws-messages';

const httpServer = http.createServer(async function (req, res) {
    const indexFile = await fs.readFile(path.resolve('./index.html'), 'utf-8');
    res.setHeader('Content-Type', 'text/html');
    return res.end(indexFile);
});

const wsServer = new WebSocketServer({server: httpServer});

redisSubscribe.subscribe(REDIS_CHANNEL);
redisSubscribe.on('message', (channel, message) => {
    if(channel === REDIS_CHANNEL){
        wsServer.clients.forEach(client => {
            client.send(message.toString());
        });
    }
});

wsServer.on('connection', (websocket) => {
    console.log(`Websocket Connection...`);
    websocket.on('message', async (message) => {
        console.log('Relaying message to broker');

        // RELAY the message to the broker
        redisPublish.publish(REDIS_CHANNEL, message.toString());
    });
});


httpServer.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});