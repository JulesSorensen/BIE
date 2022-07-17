var http = require('http');

http.createServer(function (req, res) {
    res.write("GLEDE online ✅");
    res.end();
}).listen(3030);