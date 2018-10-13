const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3001;

const server = http.createServer(app);

server.listen(port, (req, res) => {
    console.log("server started on port: 3001");
});
