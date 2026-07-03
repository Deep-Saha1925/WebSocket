import http from 'node:http'
import {WebSocketServer} from 'ws';

const PORT = process.env.PORT ?? 8000;

const httpServer = http.createServer(async function (req, res) {} );

const wsServer = new WebSocketServer({server: httpServer});

httpServer.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});