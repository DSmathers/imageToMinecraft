import { Block } from "./blocks/IBlock";
import { ColorIds } from "./colors/Colors";


// This is used to set a timeout between commands so Minecraft can keep up. 
const timer = (ms:number) => new Promise(res => setTimeout(res, ms));


function setBlock( x: number, y: number, z:number, blockName: string, color: number = 0){
    return JSON.stringify({
        "header" : {
            "version" : 1,
            "requestId" : "101",
            "messageType" : "commandRequest",
            "messagePurpose" : "commandRequest"
        },
        "body" : {
            "commandLine" : `setblock ${x} ${y} ${z} ${blockName} ${color} replace`,
            "origin" : {
                "type" : "player"
            }
        }
    })
}

function setPillar (x: number, y: number, z:number, height:number, blockName: string, color: number = 0) : string {
    return JSON.stringify({
        "header" : {
            "version" : 1,
            "requestId" : "101",
            "messageType" : "commandRequest",
            "messagePurpose" : "commandRequest"
        },
        "body" : {
            "commandLine" : `fill ${x} ${y} ${z} ${x} ${y + height} ${z} ${blockName} ${color} replace`,
            "origin" : {
                "type" : "player"
            }
        }
    })
}


export async function drawHorizontal (socket:any, blockArray : Block[][], x: number, y: number, z:number,  skipWhitespace : boolean = false) {
    for(let i = 0; i<blockArray.length; i++){
        for(let j = 0; j<blockArray[i].length; j++){
            let skip = skipWhitespace;
            if ( skip && blockArray[i][j].colorId == ColorIds.white) {
                continue;
            }   else {
                    socket.send(setBlock(
                                    x + j, 
                                    y, 
                                    z + i, 
                                    blockArray[i][j].name,
                                    blockArray[i][j].colorId));
                    await timer(20);
            }
        }
    }    
}

export async function drawVerticle (socket:any, pixelArray : Block[][], x : number, y : number, z : number, skipWhitespace : boolean = false, blockName : string ) {
    // x, y, z is top left corner of image. 
    // It builds in a positive direction on the x axis and negative on the y axis. follows given z axis. 
    // TODO: Make a copy of this that moves along the x axis instead. 

    for(let i = 0; i<pixelArray.length; i++){
        for(let j = 0; j<pixelArray[i].length; j++){
            let skip = skipWhitespace;
            if ( skip && pixelArray[i][j].colorId == ColorIds.white) {
                continue;
            }   else {
                    socket.send(setBlock(
                                    x + j, 
                                    y - i, 
                                    z, 
                                    pixelArray[i][j].name,
                                    pixelArray[i][j].colorId));
                    await timer(20);
            }
        }
    }    
}

export async function buildWalls (socket:any, pixelArray : ColorIds[][], x: number, y: number, z:number, height: number, blockName: string, color? : number ) {
    for(let i = 0; i<pixelArray.length; i++){
        for(let j = 0; j<pixelArray[i].length; j++){
            if (pixelArray[i][j] == ColorIds.white) {
                continue;
            }   else {
                    socket.send(setPillar(
                                    x + j, 
                                    y, 
                                    z + i, 
                                    height,
                                    blockName));
                    await timer(20);
            }
        }
    }    
}


