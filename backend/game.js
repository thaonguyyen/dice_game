const http = require('http');
const url = require('url');

const hostname = "127.0.0.1";
const port = 3007;
const server = http.createServer();

server.on( 'request', ( request, response) => {
    let q = url.parse(request.url, true);
    console.log(q);
    response.writeHead( 200, { 'Content-type':'application/JSON'} );
    response.end( JSON.stringify( handleRequest(q)));
})
server.listen( port, hostname, () =>console.log('server running on '+ port+' at '+hostname));

function handleRequest(q) {
    if ( q.pathname == '/start') {
        // start a new game
        game = new Game();
    } else if ( q.pathname == '/addRoll') {
      
        let rollValue=Number(q.query['roll']);
        
        if (isNaN(rollValue)) return; // exit if this isn't a number
        game.addRoll(rollValue);
    }
    return game;
}

class Game {
    constructor () {
        this.rollCount=0;
        this.rollTotal_1=0;
        this.rollTotal_2=0;
        this.totalTarget=25; // when the game is won
        this.gameStatus="new";
        
    }
    addRoll = ( rollValue )=> {
        if ( this.gameStatus=='complete') return;

        this.rollCount++;
        if (this.rollCount % 2) {
            this.gameStatus="player 2";
            this.rollTotal_1+=rollValue;
            if ( this.rollTotal_1 >= this.totalTarget) {
                this.gameStatus="complete Player 1 wins";
            }
        } else {
            this.gameStatus="player 1";
            this.rollTotal_2+=rollValue;
            if ( this.rollTotal_2 >= this.totalTarget) {
                this.gameStatus="complete Player 2 wins";
            }
        }
        
      
        return game;
    }
}
// initialize game, which is our game state container
var game = game || new Game();