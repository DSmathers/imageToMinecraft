import getPixels from "get-pixels";
import { Block } from "./blocks/IBlock";
import { ColorIds, findClosestColor, matchToBaseColor, matchToGreyscale } from "./colors/Colors";
import matchClosestBlock from "./utils/matchClosestBlock";

export type PixelColor = {
    r : number,
    g : number,
    b : number
}

export default function parseImage ( filename : string, color : boolean = true, palette : string ) : Block[][] {
    const timer = (ms:number) => new Promise(res => setTimeout(res, ms));
    const path = "./images/";

    let pixelArray : Block[][] = [];
    getPixels(path + filename, (err : any , pixels : any) => {
        if(err){
            return new Error(err.message);
        }
        let height;
        let width;

        try {
            height = pixels.shape[1];
            width = pixels.shape[0];
        } catch (e) {
            return new Error(' There was a problem parsing the image. ');
        }
    
        for(let y = 0; y < pixels.shape[1]; y++){
            let row = [];
            for(let x = 0; x < pixels.shape[0]; x++){
                const r = pixels.get(x, y, 0);
                const g = pixels.get(x, y, 1);
                const b = pixels.get(x, y, 2);
                // const a = pixels.get(x, y, 3);
                // const rgba = [r, g, b];
                //color ? row.push(findClosestColor(r, g, b)) : row.push(matchToGreyscale(r, g, b)); 
                row.push(matchClosestBlock({r, g, b}, palette));
                //row.push({r, g, b});
            }
            pixelArray.push(row);
        }
    })

    timer(30); // hack to wait for getPixel callback..

    return pixelArray;
}

