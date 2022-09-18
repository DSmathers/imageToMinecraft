import getPixels from "get-pixels";
import { findClosestWoolColor, findGreyscaleWoolColor, WoolColors } from "./colors/wool/woolColors";

export default function parseImage ( filename : string, color : boolean = true ) : WoolColors[][]{
    const timer = (ms:number) => new Promise(res => setTimeout(res, ms));
    const path = "./images/";

    let pixelArray : WoolColors[][] = [];
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
                color ? row.push(findClosestWoolColor(r, g, b)) : row.push(findGreyscaleWoolColor(r, g, b)); 
            }
            pixelArray.push(row);
        }
    })

    timer(30);

    return pixelArray;
}