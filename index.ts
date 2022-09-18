import ws from 'ws';

import {drawHorizontal, drawVerticle } from './actions';
import { WoolColors } from './colors/wool/woolColors';
import parseImage from './parseImage';


let path = "./images/";
let filename = "";
if(process.argv[2]){
    filename = process.argv[2];
} else {
    throw new Error("Couldn't find specified file in " + path)
}

let pixelArray : WoolColors[][] = parseImage(process.argv[2], false);

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

// Unused but kept for reference. 

const interaction = {
    "header" : {
        "version" : 1,
        "requestId" : "1234321",
        "messageType" : "commandRequest",
        "messagePurpose" : "subscribe"
    },
    "body" : {
        "eventName" : "MobInteracted"
    }
}
function sendPrivatemessage( user : string, message : string ) {
    return JSON.stringify({
        "header" : {
            "version" : 1,
            "requestId" : "234234",
            "messageType" : "commandRequest",
            "messagePurpose" : "commandRequest"
        },
        "body" : {
            "commandLine" : `tell ${user} ${message}`,
            "origin" : {
                "type" : "player",
                "name" : "Testy"
            }
        }
    })
}

function giveItemToPlayer ( user : string, item : string ) {
    return JSON.stringify({
        "header" : {
            "version" : 1,
            "requestId" : "234234",
            "messageType" : "commandRequest",
            "messagePurpose" : "commandRequest"
        },
        "body" : {
            "commandLine" : `give ${user} ${item} 1 `,
            "origin" : {
                "type" : "player",
                "name" : "Testy"
            }
        }
    })
}
// End reference functions. 


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
            //command example !draw h x y z true(skip whitespace)
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