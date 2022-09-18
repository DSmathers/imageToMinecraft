import ws from 'ws';
import getPixels from 'get-pixels';

import { WoolColors, drawHorizontal, findClosestWoolColor, findGreyscaleWoolColor, drawVerticle } from './actions';

let pixelArray : WoolColors[][] = [];
let path = "./images/";
let filename = "";
if(process.argv[2]){
    filename = process.argv[2];
} else {
    throw new Error("Couldn't find specified file in " + path)
}
getPixels(path + filename, (err : any , pixels : any) => {
    if(err){
        console.log(err);
        return;
    }

    for(let y = 0; y < pixels.shape[1]; y++){
        let row = [];
        for(let x = 0; x < pixels.shape[0]; x++){
            const r = pixels.get(x, y, 0);
            const g = pixels.get(x, y, 1);
            const b = pixels.get(x, y, 2);
            // const a = pixels.get(x, y, 3);
            // const rgba = [r, g, b];
            row.push(findGreyscaleWoolColor(r, g, b));
        }
        pixelArray.push(row);
    }
})


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

wss.on('connection', (socket) => {
    console.log('Connected');
    // Subsribe to chat events. 
    socket.send(JSON.stringify(subscribeToPlayerMessages));

    socket.send(response("A wild bot has appeared"));

    socket.on("drawH", () => {
        drawHorizontal(socket, pixelArray, true);
    })

    socket.on("drawV", () => {
        drawVerticle(socket, pixelArray, true);
    })

    socket.on('message', packet => {
       
        let msg = JSON.parse(packet.toString('utf-8'));

        if(msg.body.type === 'chat'){  
            let message = msg.body.message.toLowerCase().trim();

            switch(message){
                case "h!draw":
                    socket.emit("drawH");
                    break;
                case "v!draw":
                    socket.emit("drawV");
                    break;
            }
        } 
    })

    socket.on('close', (socket) => {
        console.log('connection closed');
    });
})