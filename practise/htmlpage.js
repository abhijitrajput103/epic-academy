var http = require('http');
 var inputs = `<h1>Form</h1>
 <input type="text"/> <br>
 <br> <input type="text"/>
 <br> <br> <input type="text"/> `
http.createServer(function (req, res){
    res.writeHead(200, { 'Content-type': "text/html" });

    res.write(inputs);
res.end();
}).listen(4003)