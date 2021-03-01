const http = require('http');
const fs = require('fs');
const path = require('path');
const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
    console.log('Request for ' + req.url + ' by method ' + req.method);

    if (req.method == 'GET'){
        var fileUrl;
        if (req.url == '/') fileUrl = '/index.html';
        else fileUrl = req.url;

        var filePath = path.resolve('./public' + fileUrl);
        const fileExt = path.extname(filePath);
        if (fileExt == '.html') {
            fs.exists(filePath, (exists) => {
                if (!exists) {
                    res.stateCode = 404;
                    res.setHeader('Content-Type', 'text/html')
                    res.end('<html><body><h1>Error 404: ' + fileUrl + ' not found</h1></body></html>')
                    return;
                }
                res.statusCode = 200;
                res.setHeader('ContentType', 'text/html');
                //Below: converts filePath to a stream of bytes; it is then piped through 
                //the response. Now it is ready to be sent out.
                fs.createReadStream(filePath).pipe(res);
            })
        }
        else {
            res.stateCode = 404;
            res.setHeader('Content-Type', 'text/html')
            res.end('<html><body><h1>Error 404: ' + fileUrl + ' is not an HTML file</h1></body></html>')
            return;
        }
    } else {
        res.stateCode = 404;
        res.setHeader('Content-Type', 'text/html')
        res.end('<html><body><h1>Error 404: ' + req.method + ' is not supported</h1></body></html>')
        return;
    }
});

//When the server starts, the below function will run
//The listen method will start the listening port which allows the server to 
//accept incoming reqs
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
})