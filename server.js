import http from 'node:http'

const PORT = process.env.PORT ?? 8000;

const httpServer = http.createServer(async function (req, res) {} )

httpServer.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
})