import ws from 'ws';

import {buildWalls, drawHorizontal, drawVerticle } from './actions';
import { WoolColors } from './colors/wool/woolColors';
import parseImage from './parseImage';



let colorArray : WoolColors[][] = [];
let greyscaleArray : WoolColors[][] = []; 

function isImageLoaded () : boolean {
    if(colorArray.length < 1) {
        return false;
    }
    return true;
}

function loadImage (socket : any, imageName : string ) : void {

    colorArray = parseImage(imageName + ".png", true);
    greyscaleArray = parseImage(imageName + ".png", false);
    if(colorArray.length < 1) {
        socket.send(response("Message failed to load"));
        return;
    }
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
    console.log(message);
    let x = Number(message[2]);
    let y = Number(message[3]);
    let z = Number(message[4]);
    let isColor = message[5] === 'true' ? true : false;
    let ignoreWhitespace = message[6] === "true" ? true : false; 
    if(message[1] === "h") {
        drawHorizontal(socket, 
                        isColor ? colorArray : greyscaleArray, 
                        x, 
                        y, 
                        z, 
                        ignoreWhitespace);
    }

    else if ( message[1] === "v") {
        drawVerticle(socket, isColor ? colorArray : greyscaleArray, x, y, z, ignoreWhitespace);
    }
}

function messageToBuildCommand ( socket : any, message : string[] ) {
    let x = Number(message[1]);
    let y = Number(message[2]);
    let z = Number(message[3]);
    let height = Number(message[4]);
    let blockName = message[5];
    buildWalls(socket, colorArray, x, y, z, height, blockName); 
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
                if(isImageLoaded() === true) {
                    messageToDrawCommand(socket, message);
                } else socket.send(response("No image loaded."));
                
            }

            else if ( message[0] === "!build"){
                if(isImageLoaded() === true) {
                    messageToBuildCommand(socket, message);
                } else socket.send(response("No image loaded."));
                
            }

            else if ( message[0] === "!load"){
                //
                loadImage(socket, message[1]);
            }
        } 
    })

    socket.on('close', (socket) => {
        console.log('connection closed');
    });
})