"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const actions_1 = require("./actions");
const parseImage_1 = __importDefault(require("./parseImage"));
let pixelArray = [];
if (process.argv[3].trim().toLocaleLowerCase() === "false") {
    pixelArray = (0, parseImage_1.default)(process.argv[2], false);
}
else {
    pixelArray = (0, parseImage_1.default)(process.argv[2], true);
}
const subscribeToPlayerMessages = {
    "header": {
        "version": 1,
        "requestId": "012345",
        "messageType": "commandRequest",
        "messagePurpose": "subscribe"
    },
    "body": {
        "eventName": "PlayerMessage",
    }
};
function response(msg) {
    return JSON.stringify({
        "header": {
            "version": 1,
            "requestId": "234234",
            "messageType": "commandRequest",
            "messagePurpose": "commandRequest"
        },
        "body": {
            "commandLine": `say ${msg}`,
            "origin": {
                "type": "player"
            }
        }
    });
}
;
const wss = new ws_1.default.Server({
    port: 7000
});
function messageToDrawCommand(socket, message) {
    let x = Number(message[2]);
    let y = Number(message[3]);
    let z = Number(message[4]);
    let ignoreWhitespace = message[5] === "true" ? true : false;
    if (message[1] === "h") {
        (0, actions_1.drawHorizontal)(socket, pixelArray, x, y, z, ignoreWhitespace);
    }
    else if (message[1] === "v") {
        (0, actions_1.drawVerticle)(socket, pixelArray, x, y, z, ignoreWhitespace);
    }
}
function messageToBuildCommand(socket, message) {
    let x = Number(message[1]);
    let y = Number(message[2]);
    let z = Number(message[3]);
    let height = Number(message[4]);
    let blockName = message[5];
    (0, actions_1.buildWalls)(socket, pixelArray, x, y, z, height, blockName);
}
wss.on('connection', (socket) => {
    console.log('Connected');
    socket.send(JSON.stringify(subscribeToPlayerMessages));
    socket.send(response("A wild bot has appeared"));
    socket.on('message', packet => {
        let msg = JSON.parse(packet.toString('utf-8'));
        if (msg.body.type === 'chat') {
            const message = msg.body.message.toLowerCase().trim().split(" ");
            if (message[0] === "!draw") {
                messageToDrawCommand(socket, message);
            }
            else if (message[0] === "!build") {
                messageToBuildCommand(socket, message);
            }
        }
    });
    socket.on('close', (socket) => {
        console.log('connection closed');
    });
});
