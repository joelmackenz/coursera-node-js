const http = require('http');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
    console.log(req.headers);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>Hey, World</h1></body></html>')
});

//When the server starts, the below function will run
//The listen method will start the listening port which allows the server to 
//accept incoming reqs
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
})