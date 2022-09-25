"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const actions_1 = require("./actions");
const parseImage_1 = __importDefault(require("./parseImage"));
const timer = (ms) => new Promise(res => setTimeout(res, ms));
let colorArray = [];
let greyscaleArray = [];
function isImageLoaded() {
    if (colorArray.length < 1) {
        return false;
    }
    return true;
}
function loadImage(socket, imageName) {
    return __awaiter(this, void 0, void 0, function* () {
        colorArray = (0, parseImage_1.default)(imageName + ".png", true);
        greyscaleArray = (0, parseImage_1.default)(imageName + ".png", false);
        yield timer(30);
        if (colorArray.length < 1) {
            socket.send(response("Message failed to load"));
            return;
        }
        else {
            socket.send(response("Image loaded and ready to draw!"));
        }
    });
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
    port: 8080,
    host: '0.0.0.0'
});
function messageToDrawCommand(socket, message) {
    console.log(message);
    let x = Number(message[2]);
    let y = Number(message[3]);
    let z = Number(message[4]);
    let isColor = message[5] === 'true' ? true : false;
    let ignoreWhitespace = message[6] === "true" ? true : false;
    if (message[1] === "h") {
        (0, actions_1.drawHorizontal)(socket, isColor ? colorArray : greyscaleArray, x, y, z, ignoreWhitespace);
    }
    else if (message[1] === "v") {
        (0, actions_1.drawVerticle)(socket, isColor ? colorArray : greyscaleArray, x, y, z, ignoreWhitespace);
    }
}
function messageToBuildCommand(socket, message) {
    let x = Number(message[1]);
    let y = Number(message[2]);
    let z = Number(message[3]);
    let height = Number(message[4]);
    let blockName = message[5];
    (0, actions_1.buildWalls)(socket, colorArray, x, y, z, height, blockName);
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
                if (isImageLoaded() === true) {
                    messageToDrawCommand(socket, message);
                }
                else
                    socket.send(response("No image loaded."));
            }
            else if (message[0] === "!build") {
                if (isImageLoaded() === true) {
                    messageToBuildCommand(socket, message);
                }
                else
                    socket.send(response("No image loaded."));
            }
            else if (message[0] === "!load") {
                loadImage(socket, message[1]);
            }
        }
    });
    socket.on('close', (socket) => {
        console.log('connection closed');
    });
});
