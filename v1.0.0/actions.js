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
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildWalls = exports.drawVerticle = exports.drawHorizontal = exports.setWool = void 0;
const timer = (ms) => new Promise(res => setTimeout(res, ms));
function setBlock(x, y, z, blockName, color = 0) {
    return JSON.stringify({
        "header": {
            "version": 1,
            "requestId": "101",
            "messageType": "commandRequest",
            "messagePurpose": "commandRequest"
        },
        "body": {
            "commandLine": `setblock ${x} ${y} ${z} ${blockName} ${color} replace`,
            "origin": {
                "type": "player"
            }
        }
    });
}
function setPillar(x, y, z, height, blockName, color = 0) {
    return JSON.stringify({
        "header": {
            "version": 1,
            "requestId": "101",
            "messageType": "commandRequest",
            "messagePurpose": "commandRequest"
        },
        "body": {
            "commandLine": `fill ${x} ${y} ${z} ${x} ${y + height} ${z} ${blockName} ${color} replace`,
            "origin": {
                "type": "player"
            }
        }
    });
}
function setWool(x, y, z, color = 0) {
    return setBlock(x, y, z, 'wool', color);
}
exports.setWool = setWool;
function drawHorizontal(socket, pixelArray, x, y, z, skipWhitespace = false) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < pixelArray.length; i++) {
            for (let j = 0; j < pixelArray[i].length; j++) {
                let skip = skipWhitespace;
                if (skip && pixelArray[i][j] == 0) {
                    continue;
                }
                else {
                    socket.send(setWool(x + j, y, z + i, pixelArray[i][j]));
                    yield timer(20);
                }
            }
        }
    });
}
exports.drawHorizontal = drawHorizontal;
function drawVerticle(socket, pixelArray, x, y, z, skipWhitespace = false) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < pixelArray.length; i++) {
            for (let j = 0; j < pixelArray[i].length; j++) {
                let skip = skipWhitespace;
                if (skip && pixelArray[i][j] == 0) {
                    continue;
                }
                else {
                    socket.send(setWool(x + j, y - i, z, pixelArray[i][j]));
                    yield timer(20);
                }
            }
        }
    });
}
exports.drawVerticle = drawVerticle;
function buildWalls(socket, pixelArray, x, y, z, height, blockName, color) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < pixelArray.length; i++) {
            for (let j = 0; j < pixelArray[i].length; j++) {
                if (pixelArray[i][j] == 0) {
                    continue;
                }
                else {
                    socket.send(setPillar(x + j, y, z + i, height, blockName));
                    yield timer(20);
                }
            }
        }
    });
}
exports.buildWalls = buildWalls;
