var http=require('http');
http.createServer(function(req,res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1> hello from node js server 1 </h1>');
    res.write('hello from node js server 2 <br> ');
    res.write('<button> hello from node js server 3 </button>');
    res.write("<a href='#'> hello from node js server 4 </a>");
    res.write("<img href='images/captureRejectionSymbol.jpg'> server 6 </img>");
    res.end();
}).listen(5200)

 var sum=require('./demo2')
console.log(sum(20,50));
