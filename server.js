import http from 'node:http'
import {WebSocketServer} from 'ws';
import fs from 'node:fs/promises';
import path from 'path';

const PORT = process.env.PORT ?? 8000;

const httpServer = http.createServer(async function (req, res) {
    const indexFile = fs.readFile(path.resolve('./index.html'), 'utf-8');
    res.setHeader('Content-Type', 'text/html');
    return res.end(indexFile);
});

const wsServer = new WebSocketServer({server: httpServer});

wsServer.on('connection', (websocket) => {
    console.log(`Websocket Connection...`);
    websocket.on('message', (message) => {
        console.log(message.toString());

        websocket.send(message.toString());
    })
})


httpServer.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});