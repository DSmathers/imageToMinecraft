import ws from 'ws';

import {buildWalls, drawHorizontal, drawVerticle } from './actions';
import { WoolColors } from './colors/wool/woolColors';
import parseImage from './parseImage';

let pixelArray : WoolColors[][] = [];
if(process.argv[3].trim().toLocaleLowerCase() === "false") {
    pixelArray= parseImage(process.argv[2], false);
} else {
    pixelArray = parseImage(process.argv[2], true);
}

const subscribeToPlayerMessages = {
    "header":{
        "version":1,
        "requestId": "012345",
        "messageType": "commandRequest",
        "messagePurpose":"subscribe"
    },
    "body":{
        "eventName":"PlayerMessage",

    }
}

// Says given string in chat. 
function response ( msg: string ) {
    return JSON.stringify({
        "header" : {
            "version" : 1,
            "requestId" : "234234",
            "messageType" : "commandRequest",
            "messagePurpose" : "commandRequest"
        },
        "body" : {
            "commandLine" : `say ${msg}`,
            "origin" : {
                "type" : "player"
            }
        }
    })
};

const wss = new ws.Server({
    port: 8080,
    host: '0.0.0.0'
});


function messageToDrawCommand ( socket: any, message : string[] )  {
    let x = Number(message[2]);
    let y = Number(message[3]);
    let z = Number(message[4]);
    let ignoreWhitespace = message[5] === "true" ? true : false; 
    if(message[1] === "h") {
        drawHorizontal(socket, pixelArray, x, y, z, ignoreWhitespace);
    }

    else if ( message[1] === "v") {
        drawVerticle(socket, pixelArray, x, y, z, ignoreWhitespace);
    }
}

function messageToBuildCommand ( socket : any, message : string[] ) {
    let x = Number(message[1]);
    let y = Number(message[2]);
    let z = Number(message[3]);
    let height = Number(message[4]);
    let blockName = message[5];
    buildWalls(socket, pixelArray, x, y, z, height, blockName); 
}

wss.on('connection', (socket) => {
    console.log('Connected');

    socket.send(JSON.stringify(subscribeToPlayerMessages));

    socket.send(response("A wild bot has appeared"));

    socket.on('message', packet => {
       
        let msg = JSON.parse(packet.toString('utf-8'));

        if(msg.body.type === 'chat'){  
            const message = msg.body.message.toLowerCase().trim().split(" ");
 
            if(message[0] === "!draw"){
                messageToDrawCommand(socket, message);
            }

            else if ( message[0] === "!build"){
                messageToBuildCommand(socket, message);
            }
        } 
    })

    socket.on('close', (socket) => {
        console.log('connection closed');
    });
})