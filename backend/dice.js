const http = require('http');
const url = require('url');

const hostname = "127.0.0.1";
const port = 3006;
const server = http.createServer();

server.on( 'request', ( request, response) => {
    response.writeHead( 200, { 'Content-type':'application/JSON'} );
    response.end( JSON.stringify( diceRoll()));
})
server.listen( port, hostname, () =>console.log('server running on '+ port+' at '+hostname));

function diceRoll() {
    // return between 1 and 6 inclusive
    return Math.floor(Math.random()*6+1);
}