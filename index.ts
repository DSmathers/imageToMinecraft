import ws from 'ws';

import {drawHorizontal, drawVerticle } from './actions';
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
    port: 7000
});


type DrawCommand = [
    string,
    string, 
    number,
    number,
    number,
    string, 
    boolean?
];

wss.on('connection', (socket) => {
    console.log('Connected');

    socket.send(JSON.stringify(subscribeToPlayerMessages));

    socket.send(response("A wild bot has appeared"));

    socket.on('message', packet => {
       
        let msg = JSON.parse(packet.toString('utf-8'));

        if(msg.body.type === 'chat'){  
            const message : DrawCommand = msg.body.message.toLowerCase().trim().split(" ");
            message[2] = Number(message[2]);
            message[3] = Number(message[3]);
            message[4] = Number(message[4]);

            if(message[0] === "!draw"){
                
                if(message[1] === "h"){
                    drawHorizontal(socket, pixelArray, message[2], message[3], message[4], message[5] ? true : false);
                }

                else if(message[1] === "v"){
                    drawVerticle(socket, pixelArray, message[2], message[3], message[4], message[5] ? true : false);
                }

                else return; // There was an error with the command, do something about it. 
            }
        } 
    })

    socket.on('close', (socket) => {
        console.log('connection closed');
    });
})